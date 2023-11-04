package dev.onecrazygenius.springapi.auth;

import dev.onecrazygenius.springapi.config.JwtService;
import dev.onecrazygenius.springapi.token.Token;
import dev.onecrazygenius.springapi.token.TokenRepository;
import dev.onecrazygenius.springapi.token.TokenType;
import dev.onecrazygenius.springapi.user.Role;
import dev.onecrazygenius.springapi.user.User;
import dev.onecrazygenius.springapi.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    // user repository
    private final UserRepository repository;

    // token repository
    private final TokenRepository tokenRepository;

    // password encoder
    private final PasswordEncoder passwordEncoder;

    // jwt service
    private final JwtService jwtService;

    // authentication manager
    private final AuthenticationManager authenticationManager;

    /**
     * This method is used to register a new user.
     * @param request
     * @return AuthenticationResponse
     */

    public AuthenticationResponse register(RegisterRequest request) {

        // validate the request
        if(!this.validateRegisterRequest(request)) {
            throw new RuntimeException("Invalid registration details");
        }

        // create a new user
        var user = User.builder()
            .displayname(request.getDisplayname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(request.getRole())
            .build();

        // save the user
        var savedUser = repository.save(user);

        System.out.println("savedUser: " + savedUser);

        // generate the jwt token
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);

        // return the authentication response
        return AuthenticationResponse.builder()
                                     .accessToken(jwtToken)
                                     .refreshToken(refreshToken)
                                     .build();
    }

    /**
     * This method is used to authenticate a user.
     * @param request
     * @return AuthenticationResponse
     */

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        // validate the request
        if(!this.validateAuthenticationRequest(request)) {
            throw new RuntimeException("Invalid authentication details");
        }

        // authenticate the user
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        // get the user
        var user = repository.findByEmail(request.getEmail()).orElseThrow();

        // generate the jwt token
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        // save the token
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        // return the authentication response
        return AuthenticationResponse.builder()
                                     .accessToken(jwtToken)
                                     .refreshToken(refreshToken)
                                     .build();
    }

    /**
     * This method is used to save the user token.
     * @param user
     * @param jwtToken
     */

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
        tokenRepository.save(token);
    }

    /**
     * This method is used to revoke all user tokens.
     * @param user
     */

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty()) return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    /**
     * This method is used to refresh the token.
     * @param request
     * @param response
     * @throws IOException
     */
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // get the authorization header
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;

        // check if the authorization header is valid
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }

        // get the user email
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        // check if the user email is valid
        if (userEmail != null) {
            var user = this.repository.findByEmail(userEmail).orElseThrow();
            // check if the token is valid
            if (jwtService.isTokenValid(refreshToken, user)) {

                // generate the jwt token
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);

                // return the authentication response
                var authResponse = AuthenticationResponse.builder()
                                                         .accessToken(accessToken)
                                                         .refreshToken(refreshToken)
                                                         .build();

                // set the response
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    /**
     * This method is used to validate the register request.
     * @param request
     * @return boolean
     */
    private boolean validateRegisterRequest(RegisterRequest request) {
        // check if the request is null
        if (request == null) return false;

        // check if the request displayname is null
        if (request.getDisplayname() == null) return false;

        // check if the request email is null
        if (request.getEmail() == null) return false;

        // check if the request password is null
        if (request.getPassword() == null) return false;

        // check if the request displayname is empty
        if (request.getDisplayname().isEmpty()) return false;

        // check if the request email is empty
        if (request.getEmail().isEmpty()) return false;

        // check if the request password is empty
        if (request.getPassword().isEmpty()) return false;

        // check if the request email is valid
        if (!request.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) return false;

        // check if the request password is valid
        if (request.getPassword().length() < 8) return false;

        // check if the request password contains a number
        if (!request.getPassword().matches(".*\\d.*")) return false;

        // check if the request password contains a lowercase letter
        if (!request.getPassword().matches(".*[a-z].*")) return false;

        // check if the request password contains an uppercase letter
        if (!request.getPassword().matches(".*[A-Z].*")) return false;

        // check if the request password contains a special character
        if (!request.getPassword().matches(".*[!@#$%^&*].*")) return false;

        // check if the request role is valid
        if (!request.getRole().equals(Role.USER) && !request.getRole().equals(Role.ADMIN)) return false;

        // return true
        return true;
    }

    /**
     * This method is used to validate the authentication request.
     * @param request
     * @return boolean
     */

    private boolean validateAuthenticationRequest(AuthenticationRequest request) {
        // check if the request is null
        if (request == null) return false;

        // check if the request email is null
        if (request.getEmail() == null) return false;

        // check if the request password is null
        if (request.getPassword() == null) return false;

        // check if the request email is empty
        if (request.getEmail().isEmpty()) return false;

        // check if the request password is empty
        if (request.getPassword().isEmpty()) return false;

        // check if the request email is valid
        if (!request.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) return false;

        // check if the request password is valid
        if (request.getPassword().length() < 8) return false;

        // check if the request password contains a number
        if (!request.getPassword().matches(".*\\d.*")) return false;

        // check if the request password contains a lowercase letter
        if (!request.getPassword().matches(".*[a-z].*")) return false;

        // check if the request password contains an uppercase letter
        if (!request.getPassword().matches(".*[A-Z].*")) return false;

        // check if the request password contains a special character
        if (!request.getPassword().matches(".*[!@#$%^&*].*")) return false;

        // return true
        return true;
    }

}