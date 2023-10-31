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
        // create a new user
        var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(request.getRole())
            .build();

        // save the user
        var savedUser = repository.save(user);

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
        if (validUserTokens.isEmpty())
        return;
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
}