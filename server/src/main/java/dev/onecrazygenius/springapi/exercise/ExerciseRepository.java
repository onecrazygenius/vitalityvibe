package dev.onecrazygenius.springapi.exercise;

import dev.onecrazygenius.springapi.user.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    List<Exercise> findAllByUser(User user);
}
