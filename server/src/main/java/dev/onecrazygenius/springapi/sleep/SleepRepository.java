package dev.onecrazygenius.springapi.sleep;

import dev.onecrazygenius.springapi.user.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SleepRepository extends JpaRepository<Sleep, Integer> {
    List<Sleep> findAllByUser(User user);
}
