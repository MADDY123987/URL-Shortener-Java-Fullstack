package com.url.url_shortener_Maddy.controller;

import com.url.url_shortener_Maddy.models.UrlMapping;
import com.url.url_shortener_Maddy.service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class RedirectController {

    private final UrlMappingService urlMappingService;

    /**
     * Primary public redirect endpoint: /s/{shortUrl}
     * This avoids collisions with other app routes and works nicely with a frontend dev proxy.
     */
    @GetMapping("/s/{shortUrl}")
    public ResponseEntity<Void> redirectUnderS(@PathVariable String shortUrl) {
        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);
        if (urlMapping == null) {
            return ResponseEntity.notFound().build();
        }

        // If you also record clicks here, do it BEFORE returning (not shown).
        // e.g., urlMappingService.recordClick(shortUrl, request);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", urlMapping.getOriginalUrl());
        return ResponseEntity.status(302).headers(headers).build();
    }

    /**
     * Optional: root-level slug redirect (e.g., https://yourdomain/{shortUrl})
     * Uses a negative lookahead regex to avoid matching common app paths like /api, /swagger-ui, /v3, /actuator, etc.
     * Keep this if you plan to serve short links at the domain root.
     */
    @GetMapping("/{shortUrl:^(?!api|swagger-ui|v3|actuator|error|favicon\\.ico).+$}")
    public ResponseEntity<Void> redirectAtRoot(@PathVariable String shortUrl) {
        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);
        if (urlMapping == null) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", urlMapping.getOriginalUrl());
        return ResponseEntity.status(302).headers(headers).build();
    }
}
