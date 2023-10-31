package dev.onecrazygenius.springapi.sleep;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SleepRepository extends JpaRepository<Sleep, Integer> {
}