package dev.onecrazygenius.vitalityvibe.service;

// dev.onecrazygenius.vitalityvibe (vitalityvibe)
import dev.onecrazygenius.vitalityvibe.repository.UserRepository;
import dev.onecrazygenius.vitalityvibe.model.User;

// org.springframework (springframework)
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.security.core.userdetails.UserDetailsService; 
import org.springframework.security.core.userdetails.UserDetails; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

// java.util (java.util)
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

	/*
	 * Check if user exists by email
	 */
	public boolean existsByEmail(String email) { 
		return repository.findByEmail(email).isPresent(); 
	}

	/*
	 * Add new user
	 */
	public String addUser(User user) { 
		user.setPassword(encoder.encode(user.getPassword())); 
		repository.save(user); 
		return "User Added Successfully"; 
	} 

	/*
	 * Get user by email
	 */
	public Optional<User> getUserByEmail(String email) {
		return repository.findByEmail(email).map(user -> {
			return user;
		});
	}

	/*
	 * Update user
	 */
	public String updateUser(User user) {
		repository.save(user);
		return "User Updated Successfully"; 
	}

} 
