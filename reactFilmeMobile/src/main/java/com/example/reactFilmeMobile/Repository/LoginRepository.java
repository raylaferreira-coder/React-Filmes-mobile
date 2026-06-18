package com.example.reactFilmeMobile.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.reactFilmeMobile.Model.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {

    Optional<Login> findByEmail(String email);

}