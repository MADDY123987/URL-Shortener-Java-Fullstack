package com.url.url_shortener_Maddy.service;

import com.url.url_shortener_Maddy.dtos.ClickEventDTO;
import com.url.url_shortener_Maddy.dtos.UrlMappingDTO;
import com.url.url_shortener_Maddy.models.ClickEvent;
import com.url.url_shortener_Maddy.models.UrlMapping;
import com.url.url_shortener_Maddy.models.User;
import com.url.url_shortener_Maddy.repository.ClickEventRepository;
import com.url.url_shortener_Maddy.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;

    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }

    private UrlMappingDTO convertToDto(UrlMapping urlMapping) {
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        return urlMappingDTO;
    }

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        java.security.SecureRandom random = new java.security.SecureRandom();
        StringBuilder shortUrl = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .toList();
    }

    /** EXISTING (kept for compatibility) – analytics by slug without ownership check */
    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet().stream()
                    .map(entry -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(entry.getKey());
                        clickEventDTO.setCount(entry.getValue());
                        return clickEventDTO;
                    })
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    /** NEW – owner-safe lookup for a slug */
    public Optional<UrlMapping> findByShortUrlAndUser(String shortUrl, User user) {
        return urlMappingRepository.findByShortUrlAndUser(shortUrl, user);
    }

    /** NEW – analytics using a mapping already verified to belong to the user */
    public List<ClickEventDTO> getClickEventsByDate(UrlMapping urlMapping,
                                                    LocalDateTime start,
                                                    LocalDateTime end) {
        return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                .collect(Collectors.groupingBy(c -> c.getClickDate().toLocalDate(), Collectors.counting()))
                .entrySet().stream()
                .map(e -> {
                    ClickEventDTO dto = new ClickEventDTO();
                    dto.setClickDate(e.getKey());
                    dto.setCount(e.getValue());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user,
                                                            LocalDateTime from,
                                                            LocalDateTime toExclusive) {
        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        if (urlMappings.isEmpty()) return Map.of();

        List<ClickEvent> clickEvents =
                clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings, from, toExclusive);

        return clickEvents.stream()
                .collect(Collectors.groupingBy(
                        e -> e.getClickDate().toLocalDate(),
                        java.util.TreeMap::new,
                        Collectors.counting()
                ));
    }

    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);

            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepository.save(clickEvent);
        }
        return urlMapping;
    }
}
