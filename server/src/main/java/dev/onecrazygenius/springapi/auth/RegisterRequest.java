package dev.onecrazygenius.springapi.auth;

import dev.onecrazygenius.springapi.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  private String displayname;
  private String email;
  private String password;
  private Role role;
}