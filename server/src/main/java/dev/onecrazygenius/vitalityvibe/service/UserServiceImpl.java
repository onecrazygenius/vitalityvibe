package dev.onecrazygenius.vitalityvibe.service;

import dev.onecrazygenius.vitalityvibe.model.User;
import dev.onecrazygenius.vitalityvibe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.core.userdetails.UserDetails; 
import org.springframework.security.core.userdetails.UserDetailsService; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.stereotype.Service; 

import java.util.Optional; 

@Service
public class UserServiceImpl implements UserDetailsService { 

	@Autowired
	private UserRepository repository; 

	@Autowired
	private PasswordEncoder encoder; 

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException { 

		Optional<User> userDetail = repository.findByEmail(email); 

		return userDetail.map(UserDetailsImpl::new) 
				.orElseThrow(() -> new UsernameNotFoundException("User not found " + email)); 
	} 

	public String addUser(User user) { 
		user.setPassword(encoder.encode(user.getPassword())); 
		repository.save(user); 
		return "User Added Successfully"; 
	} 


} 
