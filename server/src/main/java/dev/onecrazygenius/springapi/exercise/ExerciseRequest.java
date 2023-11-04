package dev.onecrazygenius.springapi.exercise;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ExerciseRequest {

    private LocalDateTime datetime;
    private ExerciseType type;
    private Integer duration;
    private Integer calories;
}