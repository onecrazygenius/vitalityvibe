package dev.onecrazygenius.springapi.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserService {

    // password encoder
    private final PasswordEncoder passwordEncoder;

    // user repository
    private final UserRepository repository;

    /**
     * This method is used to change the password.
     * @param request
     * @param connectedUser
     */

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // validate new password
        if (!this.validatePassword(request.getNewPassword())) {
            throw new IllegalStateException("Password is not valid");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        repository.save(user);
    }

    /**
     * This method is used to get the user information.
     * @param user
     * @return ProfileResponse
     */
    public ProfileResponse getProfile(User user) {
        return ProfileResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .displayname(user.getDisplayname())
            .build();
    }

    /**
     * This method is used to validate the password.
     * @param password
     * @return boolean
     */
    private boolean validatePassword(String password) {
    
        if (password.length() < 8) return false;

        if (!password.matches(".*[a-z].*")) return false;

        if (!password.matches(".*[A-Z].*")) return false;

        if (!password.matches(".*[0-9].*")) return false;

        if (!password.matches(".*[!@#$%^&*()_+=-].*")) return false;

        return true;
    
    }
}