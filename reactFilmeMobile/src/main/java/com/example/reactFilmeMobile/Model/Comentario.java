package com.example.reactFilmeMobile.Model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity(name = "comentario")
public class Comentario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Column(name = "codigoFilme")
	private Long codigoFilme;

	@NotBlank
	@Size(max = 255)
	@Column(name = "postagem")
	private String postagem;

	@NotBlank
	@Size(max = 60)
	@Column(name = "nome")
	private String nome;

	@Column(name = "like")
	private Long like;

	@Column(name = "dataPostagem")
	private LocalDate dataPostagem;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPostagem() {
		return postagem;
	}

	public void setPostagem(String postagem) {
		this.postagem = postagem;
	}

	public Long getCodigoFilme() {
		return codigoFilme;
	}

	public void setCodigoFilme(Long codigo) {
		this.codigoFilme = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Long getLike() {
		return like;
	}

	public void setLike(Long like) {
		this.like = like;
	}

	public LocalDate getDataPostagem() {
		return dataPostagem;
	}

	public void setDataPostagem(LocalDate dataPostagem) {
		this.dataPostagem = dataPostagem;
	}
}