package dev.onecrazygenius.springapi.meals;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class MealRequest {

    private LocalDateTime datetime;
    private String description;
    private MealType type;
    private Integer calories;
}