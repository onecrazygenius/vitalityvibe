package dev.onecrazygenius.springapi.sleep;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class SleepRequest {

    private LocalDateTime start;
    private LocalDateTime end;
    private Integer duration;
    private Integer quality;
}