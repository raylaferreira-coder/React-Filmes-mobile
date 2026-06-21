package com.example.reactFilmeMobile.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.reactFilmeMobile.DTO.AuthRequestDTO;
import com.example.reactFilmeMobile.DTO.TokenResponseDTO;
import com.example.reactFilmeMobile.Model.Login;
import com.example.reactFilmeMobile.Security.JwtService;
import com.example.reactFilmeMobile.Service.LoginService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtService jwtService;

    @Operation(summary = "Autenticar usuário")
    @PostMapping("/login")
    public ResponseEntity<?> autenticar(@Valid @RequestBody AuthRequestDTO authDto) {

        Login usuario = loginService.buscarPorEmail(authDto.email());

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Usuário não encontrado");
        }

        if (!usuario.getSenha().equals(authDto.senha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Senha inválida");
        }

        String token = jwtService.gerarToken(usuario.getEmail());

        return ResponseEntity.ok(new TokenResponseDTO(token));
    }

    @Operation(summary = "Cadastrar usuário")
    @PostMapping("/cadastro")
    public ResponseEntity<Login> salvarLogin(@Valid @RequestBody Login login) {
        // CORRIGIDO: Agora chamando o método salvarLogin corretamente
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(loginService.salvarLogin(login));
    }

    @Operation(summary = "Listar usuários")
    @GetMapping
    public ResponseEntity<List<Login>> listarLogins() {
        return ResponseEntity.ok(loginService.buscaLogins());
    }

    @Operation(summary = "Buscar usuário por ID")
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Login>> listarLogin(@PathVariable Long id) {
        return ResponseEntity.ok(loginService.buscaLogin(id));
    }

    @Operation(summary = "Atualizar usuário")
    @PutMapping("/{id}")
    public ResponseEntity<Login> atualizarLogin(
            @Valid @RequestBody Login login,
            @PathVariable Long id) {

        return ResponseEntity.ok(loginService.atualizar(login, id));
    }

    @Operation(summary = "Excluir usuário")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        loginService.deletar(id);
    }
}