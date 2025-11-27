package com.url.url_shortener_Maddy.models;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "url_mapping")
public class       UrlMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   // BIGINT AUTO_INCREMENT PK
    private Long id;

    @Column(name = "original_url", nullable = false, length = 2048)
    private String originalUrl;

    @Column(name = "short_url", nullable = false, unique = true, length = 255)
    private String shortUrl;

    private int clickCount = 0;

    private LocalDateTime createdDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")   // FK -> users.id
    private User user;

    @OneToMany(mappedBy = "urlMapping", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClickEvent> clickEvents = new ArrayList<>();
}
