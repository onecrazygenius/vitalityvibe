package dev.onecrazygenius.vitalityvibe;

// org.springframework.boot (spring-boot-starter)
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class VitalityVibeApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(VitalityVibeApplication.class, args);
	}

}
