package dev.onecrazygenius.springapi.meals;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/metrics/meal")
@RequiredArgsConstructor
public class MealController {

    private final MealService service;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody MealRequest request) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping
    public ResponseEntity<?> findAllMeal() {
        return ResponseEntity.ok(service.findAll());
    }
}