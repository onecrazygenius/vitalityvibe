package dev.onecrazygenius.springapi.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    // jwt secret key
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    // jwt expiration
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    // jwt refresh expiration
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    /**
     * This method is used to extract the username from the token.
     * @param token
     * @return String
     */

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * This method is used to extract the claims from the token.
     * @param token
     * @param claimsResolver
     * @return T
     */

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * This method is used to generate the token.
     * @param userDetails
     * @return String
     */

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * This method is used to generate the token.
     * @param extraClaims
     * @param userDetails
     * @return String
     */

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    /**
     * This method is used to generate the refresh token.
     * @param userDetails
     * @return String
     */

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    /**
     * This method is used to generate the token.
     * @param extraClaims
     * @param userDetails
     * @param expiration
     * @return String
     */

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
        return Jwts.builder()
                   .setClaims(extraClaims)
                   .setSubject(userDetails.getUsername())
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + expiration))
                   .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                   .compact();
    }

    /**
     * This method is used to validate the token.
     * @param token
     * @param userDetails
     * @return boolean
     */

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * This method is used to validate the token.
     * @param token
     * @return boolean
     */

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * This method is used to validate the refresh token.
     * @param token
     * @param userDetails
     * @return boolean
     */

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * This method is used to validate the refresh token.
     * @param token
     * @param userDetails
     * @return boolean
     */

    private Claims extractAllClaims(String token) {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    /**
     * This method is used to get the sign in key.
     * @param null
     * @return Key
     */

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}