package dev.onecrazygenius.vitalityvibe.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import dev.onecrazygenius.vitalityvibe.models.UserModel;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {

    @Query("{'email': ?0}")
    UserModel findByEmail(String email);
}
