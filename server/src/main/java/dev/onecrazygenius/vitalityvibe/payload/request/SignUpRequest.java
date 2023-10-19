package dev.onecrazygenius.vitalityvibe.payload.request;

import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor; 

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
        private String name;
        private String password;
        private String email;
        private String role = "ROLE_USER";
}
