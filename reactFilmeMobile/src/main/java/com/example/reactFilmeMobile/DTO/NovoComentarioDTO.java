package com.example.reactFilmeMobile.DTO;

import jakarta.validation.constraints.NotBlank;

public record NovoComentarioDTO(

        @NotBlank(message = "O comentário deve possuir um conteúdo.")
        String postagem,

        @NotBlank(message = "O ID do filme é obrigatório.")
        Long filmeId,

        @NotBlank(message = "O nome do usuário é obrigatório.")
        String nome) { // Campo adicionado para garantir a consistência com o Model

}