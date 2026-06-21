package com.example.reactFilmeMobile.DTO;

import jakarta.validation.constraints.NotBlank;

public record NovoComentarioDTO(

                @NotBlank(message = "O comentário deve possuir um conteúdo.") String postagem,

                @NotBlank() String filmeId) {

}
