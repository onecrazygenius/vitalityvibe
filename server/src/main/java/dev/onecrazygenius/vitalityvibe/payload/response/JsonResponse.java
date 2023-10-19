package dev.onecrazygenius.vitalityvibe.payload.response;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JsonResponse {
    private String message;
    private String status;
    private Object data;
}
