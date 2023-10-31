package dev.onecrazygenius.springapi.web;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void shouldRegisterUser() throws Exception {
        this.mockMvc.perform(
            post("/api/v1/auth/register")
            .contentType("application/json")
            .content("{\"firstname\":\"Magnus\",\"lastname\":\"Carlsen\",\"email\":\"magnus.carlsen@chess.com\",\"password\":\"Password!1\",\"role\":\"ADMIN\"}")
        ).andDo(print())
        .andExpect(status().isOk());
    }
}