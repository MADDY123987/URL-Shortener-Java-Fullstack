// src/main/java/com/url/url_shortener_Maddy/security/jwt/JwtUtils.java
package com.url.url_shortener_Maddy.security.jwt;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    // default secret used only if property is missing
    @Value("${jwt.secret:mySuperStrongSecretKey12345}")
    private String jwtSecret;

    // default to 1 day in milliseconds if property missing
    @Value("${jwt.expiration:86400000}")
    private long jwtExpirationsMs;


    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            // remove the "Bearer " prefix
            String token = bearerToken.substring(7);
            // strip quotes + whitespace just in case
            return token.trim().replace("\"", "");
        }
        return null;
    }

    public String generateToken(UserDetails userDetails) {
        String username = userDetails.getUsername();
        String roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + jwtExpirationsMs))
                .signWith(key())
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token.trim().replace("\"", ""))
                .getPayload()
                .getSubject();
    }

    // Handles both Base64 and raw string secrets
    private Key key() {
        byte[] keyBytes;
        try {
            keyBytes = Decoders.BASE64.decode(jwtSecret);
        } catch (IllegalArgumentException e) {
            keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(String authToken) {
        if (authToken == null || authToken.isBlank()) {
            return false;
        }
        try {
            String clean = authToken.trim().replace("\"", "");
            Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parseSignedClaims(clean);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // don’t throw runtime, just say it’s invalid
            return false;
        }
    }
}
