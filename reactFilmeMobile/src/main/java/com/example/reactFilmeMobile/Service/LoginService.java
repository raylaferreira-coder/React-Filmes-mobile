package com.example.reactFilmeMobile.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.example.reactFilmeMobile.Model.Login;
import com.example.reactFilmeMobile.Repository.LoginRepository;

@Service
public class LoginService implements UserDetailsService {

    @Autowired
    private LoginRepository repository;

    public List<Login> buscaLogins() {
        return repository.findAll();
    }

    public Optional<Login> buscaLogin(Long id) {
        return repository.findById(id);
    }

    public Login savarLogin(Login login) {
        return repository.save(login);
    }

    public Login atualizar(Login login, Long id) {

        login.setId(id);

        return repository.save(login);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Login buscarPorEmail(String email) {
        return repository.findByEmail(email)
                .orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        Login usuario = repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return User.builder()
                .username(usuario.getEmail())
                .password(usuario.getSenha())
                .authorities("USER")
                .build();
    }
}