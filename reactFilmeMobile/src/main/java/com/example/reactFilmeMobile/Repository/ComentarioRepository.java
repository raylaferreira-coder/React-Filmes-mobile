package com.example.reactFilmeMobile.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.reactFilmeMobile.Model.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
	List<Comentario> findByFilmeId(Long filmeId);
}
