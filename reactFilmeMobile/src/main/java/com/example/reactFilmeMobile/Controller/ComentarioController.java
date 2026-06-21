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

import com.example.reactFilmeMobile.DTO.NovoComentarioDTO;
import com.example.reactFilmeMobile.Model.Comentario;
import com.example.reactFilmeMobile.Service.ComentarioService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/comentario")
public class ComentarioController {

	@Autowired
	private ComentarioService comentarioService;

	@Operation(summary = "Listar de comentários pelo id do filme")

	@GetMapping("/{filmeId}")
	public ResponseEntity<List<Comentario>> listarPorFilme(@PathVariable Long filmeId) {
	    List<Comentario> comentarios = comentarioService.buscaComentariosPorFilme(filmeId);
	    return ResponseEntity.ok(comentarios);
	}
	
	@Operation(summary = "Listar de comentários")

	@GetMapping
	public ResponseEntity<List<Comentario>> listarComentarios() {
		return ResponseEntity.ok(comentarioService.buscaComentarios());

	}

	@Operation(summary = "Busca comentário por id")
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Comentario>> listarCometario(@PathVariable Long id) {
		return ResponseEntity.ok(comentarioService.buscaComentario(id));

	}

	@Operation(summary = "Criar comentaário")
	@PostMapping
	public ResponseEntity<Comentario> salvarComentario(@Valid @RequestBody NovoComentarioDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(comentarioService.salvar(dto));

	}

	@Operation(summary = "Modificar comentário")

	@PutMapping("/{id}")
	public ResponseEntity<Comentario> atualizarComentario(@Valid @RequestBody NovoComentarioDTO dto,
			@PathVariable Long id) {
		return ResponseEntity.ok(comentarioService.atualizar(dto, id));
	}

	@Operation(summary = "Deletar comentário")

	@DeleteMapping
	public void deletar(@PathVariable Long id) {
		comentarioService.deletar(id);
	}

}
