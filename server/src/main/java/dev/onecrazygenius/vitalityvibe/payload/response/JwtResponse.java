package dev.onecrazygenius.vitalityvibe.payload.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.springframework.beans.factory.annotation.Value;

@Getter
@Setter
public class JwtResponse {
    private String token;

    @Value("${jwt.expiration:Bearer}")
    private String type = "Bearer";

    private String id;
    
    private String email;

    private List<String> roles;

    public JwtResponse(String accessToken, String id, String email, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.roles = roles;
    }
}
