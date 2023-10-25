package dev.onecrazygenius.vitalityvibe.filter;

// dev.onecrazygenius.vitalityvibe (vitalityvibe)
import dev.onecrazygenius.vitalityvibe.service.JwtService;
import dev.onecrazygenius.vitalityvibe.service.UserServiceImpl;

// org.springframework (springframework)
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource; 
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.security.core.userdetails.UserDetails; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.filter.OncePerRequestFilter; 
import org.springframework.stereotype.Component; 

// jakarta.servlet (jakarta.servlet)
import jakarta.servlet.FilterChain; 
import jakarta.servlet.ServletException; 
import jakarta.servlet.http.HttpServletRequest; 
import jakarta.servlet.http.HttpServletResponse; 

// java.io (java.base)
import java.io.IOException; 

@Component
public class JwtAuthFilter extends OncePerRequestFilter { 

	@Autowired
	private JwtService jwtService; 

	@Autowired
	private UserServiceImpl userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException { 
		String authHeader = request.getHeader("Authorization"); 
		String token = null; 
		String email = null; 
		if (authHeader != null && authHeader.startsWith("Bearer ")) { 
			token = authHeader.substring(7); 
			email = jwtService.extractEmail(token);
		} 

		if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) { 
			UserDetails userDetails = userDetailsService.loadUserByUsername(email); 
			if (jwtService.validateToken(token, userDetails)) { 
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()); 
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); 
				SecurityContextHolder.getContext().setAuthentication(authToken); 
			} 
		} 
		filterChain.doFilter(request, response); 
	} 
} 
