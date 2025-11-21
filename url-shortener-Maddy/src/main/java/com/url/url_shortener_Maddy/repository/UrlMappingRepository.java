package com.url.url_shortener_Maddy.repository;

import com.url.url_shortener_Maddy.models.UrlMapping;
import com.url.url_shortener_Maddy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {
    UrlMapping findByShortUrl(String shortUrl);
    List<UrlMapping> findByUser(User user);

    // NEW: ensure a slug belongs to a specific user
    Optional<UrlMapping> findByShortUrlAndUser(String shortUrl, User user);
}
