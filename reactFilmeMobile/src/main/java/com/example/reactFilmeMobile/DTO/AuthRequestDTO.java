package com.example.reactFilmeMobile.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthRequestDTO(

        @NotBlank(message = "O e-mail é obrigatório para o login.") @Email(message = "O formato do e-mail é inválido.") String email,

        @NotBlank(message = "A senha é obrigatória para o login.") String senha) {
}
