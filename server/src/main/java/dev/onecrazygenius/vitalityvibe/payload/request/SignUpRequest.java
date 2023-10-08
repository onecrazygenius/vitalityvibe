package dev.onecrazygenius.vitalityvibe.payload.request;

import java.util.Set;

import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
    @NotBlank
    @Email
    @Size(max = 255)
    private String email;

    @NotBlank
    private String password;

    private Set<String> roles;
}
