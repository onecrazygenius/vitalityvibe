package dev.onecrazygenius.springapi;

import dev.onecrazygenius.springapi.auth.AuthenticationService;
import dev.onecrazygenius.springapi.auth.RegisterRequest;
import dev.onecrazygenius.springapi.user.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import static dev.onecrazygenius.springapi.user.Role.ADMIN;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class VitalityVibeApplication {

	/**
	 * Main method to start the Spring Boot application.
	 * @param args
	 * 
	 * @return void
	 */

	public static void main(String[] args) {
		SpringApplication.run(VitalityVibeApplication.class, args);
	}

	/**
	 * This method is used to create the admin and manager users.
	 * @param service
	 * 
	 * @return CommandLineRunner
	 */

	@Bean
	public CommandLineRunner commandLineRunner(AuthenticationService service) {
		return args -> {
			// create the admin user
			var admin = RegisterRequest.builder()
					.firstname("Admin")
					.lastname("Admin")
					.email("admin@mail.com")
					.password("password")
					.role(ADMIN)
					.build();

			// pring out the token for the admin user
			System.out.println("Admin token: " + service.register(admin).getAccessToken());};
	}
}