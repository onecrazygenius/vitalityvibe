package dev.onecrazygenius.springapi.config;

import dev.onecrazygenius.springapi.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    // token repository
    private final TokenRepository tokenRepository;

    /**
     * This method is used to logout the user.
     * @param request
     * @param response
     * @param authentication
     */

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // get the authorization header
        final String authHeader = request.getHeader("Authorization");
        final String jwt;

        // check if the authorization header is null or does not start with Bearer
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }

        // get the jwt
        jwt = authHeader.substring(7);
        var storedToken = tokenRepository.findByToken(jwt).orElse(null);

        // check if the token is not null
        if (storedToken != null) {
            // set the token to expired and revoked
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            tokenRepository.save(storedToken);
            SecurityContextHolder.clearContext();
        }
    }
}
