package dev.onecrazygenius.springapi.meals;

import dev.onecrazygenius.springapi.user.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Integer> {
    List<Meal> findAllByUser(User user);
}
