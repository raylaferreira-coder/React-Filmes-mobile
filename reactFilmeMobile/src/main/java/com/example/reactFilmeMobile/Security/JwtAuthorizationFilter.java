package com.example.reactFilmeMobile.Security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.reactFilmeMobile.Service.LoginService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

        @Autowired
        private JwtService jwtService;

        @Autowired
        private LoginService loginService;

        @Override
        protected void doFilterInternal(
                        HttpServletRequest request,
                        HttpServletResponse response,
                        FilterChain chain)
                        throws ServletException, IOException {

                String path = request.getRequestURI();

                if (path.startsWith("/login/auth") ||
                                request.getMethod().equals("POST") && path.equals("/login") ||
                                path.startsWith("/swagger-ui") ||
                                path.startsWith("/v3/api-docs")) {
                        chain.doFilter(request, response);
                        return;
                }

                String header = request.getHeader("Authorization");

                if (header == null || !header.startsWith("Bearer ")) {
                        chain.doFilter(request, response);
                        return;
                }

                String token = header.substring(7);

                String email = jwtService.validarToken(token);

                if (email == null) {

                        enviarErro(
                                        response,
                                        HttpStatus.UNAUTHORIZED,
                                        "Token inválido ou expirado.");

                        return;
                }

                if (SecurityContextHolder
                                .getContext()
                                .getAuthentication() == null) {

                        UserDetails usuario = loginService.loadUserByUsername(email);

                        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                                        usuario,
                                        null,
                                        usuario.getAuthorities());

                        auth.setDetails(
                                        new WebAuthenticationDetailsSource()
                                                        .buildDetails(request));

                        SecurityContextHolder
                                        .getContext()
                                        .setAuthentication(auth);
                }

                chain.doFilter(request, response);
        }

        private void enviarErro(
                        HttpServletResponse response,
                        HttpStatus status,
                        String mensagem)
                        throws IOException {

                response.setStatus(status.value());
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");

                response.getWriter().write(
                                "{\"status\":"
                                                + status.value()
                                                + ",\"mensagem\":\""
                                                + mensagem
                                                + "\"}");
        }
}