package com.example.reactFilmeMobile.Config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter; 
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera todos os endpoints da API (ex: /filmes, /login)
                .allowedOrigins("*") // Permite requisições de qualquer origem (ideal para o desenvolvimento com
                                     // emuladores)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD") // Métodos HTTP permitidos
                .allowedHeaders("*"); // Permite todos os cabeçalhos (essencial para quando você enviar o Token JWT)
    }
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowedOrigins(List.of("*")); 
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        config.setAllowedHeaders(List.of("*")); 
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}