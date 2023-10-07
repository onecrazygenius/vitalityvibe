package dev.onecrazygenius.vitalityvibe.models;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserModel {

    @Id
    private String id;
    private String email;
    private String password;
}
