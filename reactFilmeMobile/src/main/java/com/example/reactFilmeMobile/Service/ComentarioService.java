package com.example.reactFilmeMobile.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.reactFilmeMobile.DTO.NovoComentarioDTO;
import com.example.reactFilmeMobile.Model.Comentario;
import com.example.reactFilmeMobile.Repository.ComentarioRepository;

@Service
public class ComentarioService {

	@Autowired
	private ComentarioRepository comentarioRepository;

	public List<Comentario> buscaComentarios() {
		return comentarioRepository.findAll();

	}

	public Optional<Comentario> buscaComentario(Long id) {
		return comentarioRepository.findById(id);
	}

	public Comentario salvar(NovoComentarioDTO dto) {
		Comentario novoComentario = new Comentario();

		novoComentario.setPostagem(dto.postagem());
		novoComentario.setFilmeId(dto.filmeId());

		return comentarioRepository.save(novoComentario);
	}

	public Comentario atualizar(NovoComentarioDTO dto, Long id) {
		Comentario comentarioPresente = comentarioRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("dados não encontrado com o id" + id));

		comentarioPresente.setPostagem(dto.postagem());

		return comentarioRepository.save(comentarioPresente);
	}

	public void deletar(Long id) {
		comentarioRepository.deleteById(id);
	}

}
