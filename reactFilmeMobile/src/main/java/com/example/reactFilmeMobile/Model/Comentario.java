package com.example.reactFilmeMobile.Model;

import java.time.Instant;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "comentario")
public class Comentario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 255)
	@Column(name = "postagem", columnDefinition = "TEXT", nullable = false)
	private String postagem;

	@NotBlank
	@Size(max = 60)
	@Column(name = "nome")
	private String nome;

	@Column(name = "like")
	private int like;

	@Column(name = "dataPostagem")
	private Instant dataPostagem;

	private String avatarURL;

	@NotBlank
	@Column(name = "codigoFilme")
	private String filmeId; // Amarra o comentário ao ID retornado do TMDB no front

	public Comentario() {
	}

	public Comentario(Long id, String nome, String postagem, int like, Instant dataPostagem, String avatarURL,
			String filmeId) {
		super();
		this.id = id;
		this.nome = nome;
		this.postagem = postagem;
		this.dataPostagem = dataPostagem;
		this.like = like;
		this.avatarURL = avatarURL;
		this.filmeId = filmeId;
	}

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

	public String getFilmeId() {
		return filmeId;
	}

	public void setFilmeId(String filmeId) {
		this.filmeId = filmeId;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public int getLike() {
		return like;
	}

	public void setLike(int like) {
		this.like = like;
	}

	public Instant getDataPostagem() {
		return dataPostagem;
	}

	public void setDataPostagem(Instant dataPostagem) {
		this.dataPostagem = dataPostagem;
	}

	public String getAvatarURL() {
		return avatarURL;
	}

	public void setAvatarURL(String avatarURL) {
		this.avatarURL = avatarURL;
	}
}