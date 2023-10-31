package dev.onecrazygenius.springapi.sleep;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/metrics/sleep")
@RequiredArgsConstructor
public class SleepController {

    private final SleepService service;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody SleepRequest request) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping
    public ResponseEntity<List<Sleep>> findAllSleep() {
        return ResponseEntity.ok(service.findAll());
    }
}