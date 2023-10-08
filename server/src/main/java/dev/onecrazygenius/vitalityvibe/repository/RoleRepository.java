package dev.onecrazygenius.vitalityvibe.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import dev.onecrazygenius.vitalityvibe.model.Role;
import dev.onecrazygenius.vitalityvibe.model.enums.ERole;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByRoleName(ERole roleName);
}