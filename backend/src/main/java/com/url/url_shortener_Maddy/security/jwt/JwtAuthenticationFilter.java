package com.url.url_shortener_Maddy.security.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtTokenProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Skip JWT processing for:
     *  - CORS preflight OPTIONS
     *  - public auth endpoints (/api/auth/**)
     *  - public redirect under /s/**
     *  - optional root-level single-segment slugs (e.g., "/abc123"), but not "/api/**"
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        final String p = request.getServletPath();

        // 1) CORS preflight
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        // 2) Public auth endpoints
        if (p.startsWith("/api/auth/")) {
            return true;
        }

        // 3) Public redirect path /s/**
        if (p.startsWith("/s/")) {
            return true;
        }

        // 4) Optional: root-level single segment slugs (e.g., "/abc123"), not "/api/**"
        // Path must start with a single slash, have no additional slash, and be longer than "/"
        if (!p.startsWith("/api/") && p.length() > 1 && p.indexOf('/', 1) == -1) {
            // Examples that return true: "/abc123", "/x", "/ZZZ999"
            // Examples that return false: "/", "/api/...", "/s/abc123", "/foo/bar"
            return true;
        }

        // Everything else should be filtered
        return false;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        try {
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                String jwt = jwtTokenProvider.getJwtFromHeader(request);

                if (jwt != null && jwtTokenProvider.validateToken(jwt)) {
                    String username = jwtTokenProvider.getUserNameFromJwtToken(jwt);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    if (userDetails != null) {
                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails, null, userDetails.getAuthorities());
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }
        } catch (Exception e) {
            // Don't break the chain if token parse fails; just continue unauthenticated
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}
