package dev.onecrazygenius.vitalityvibe.service;

import io.jsonwebtoken.Claims; 
import io.jsonwebtoken.Jwts; 
import io.jsonwebtoken.SignatureAlgorithm; 
import io.jsonwebtoken.io.Decoders; 
import io.jsonwebtoken.security.Keys; 
import org.springframework.security.core.userdetails.UserDetails; 
import org.springframework.stereotype.Component; 

import java.nio.charset.Charset;
import java.security.Key; 
import java.util.Date; 
import java.util.HashMap; 
import java.util.Map; 
import java.util.function.Function; 

@Component
public class JwtService { 

	public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437"; 
	public String generateToken(String userName) { 
		Map<String, Object> claims = new HashMap<>(); 
		return createToken(claims, userName); 
	} 

	private String createToken(Map<String, Object> claims, String userName) { 
		return Jwts.builder() 
				.setClaims(claims) 
				.setSubject(userName) 
				.setIssuedAt(new Date(System.currentTimeMillis())) 
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 30 minutes
				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact(); 
	} 

	private Key getSignKey() { 
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	} 

	public String extractEmail(String token) { 
		return Jwts
				.parser() 
				.setSigningKey(getSignKey()) 
				.parseClaimsJws(token) 
				.getBody() 
				.getSubject();
	} 

	private Claims extractAllClaims(String token) { 
		return Jwts 
				.parser() 
				.setSigningKey(getSignKey()) 
				.parseClaimsJws(token) 
				.getBody(); 
	} 

	public Date extractExpiration(String token) { 
		return Jwts
				.parser() 
				.setSigningKey(getSignKey()) 
				.parseClaimsJws(token) 
				.getBody() 
				.getExpiration();
	}

	private Boolean isTokenExpired(String token) { 
		return extractExpiration(token).before(new Date()); 
	} 

	public Boolean validateToken(String token, UserDetails userDetails) { 
		final String email = extractEmail(token); 
		return (email.equals(userDetails.getUsername()) && !isTokenExpired(token)); 
	} 

} 
