package dev.onecrazygenius.springapi.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static dev.onecrazygenius.springapi.user.Permission.ADMIN_CREATE;
import static dev.onecrazygenius.springapi.user.Permission.ADMIN_DELETE;
import static dev.onecrazygenius.springapi.user.Permission.ADMIN_READ;
import static dev.onecrazygenius.springapi.user.Permission.ADMIN_UPDATE;

@RequiredArgsConstructor
public enum Role {

    // user role
    USER(Collections.emptySet()),

    // admin role
    ADMIN(
        Set.of(
                ADMIN_READ,
                ADMIN_UPDATE,
                ADMIN_DELETE,
                ADMIN_CREATE
        )
    );

    // permissions
    @Getter
    private final Set<Permission> permissions;

    /**
     * This method is used to get the authorities.
     * @return List<SimpleGrantedAuthority>
     */

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
