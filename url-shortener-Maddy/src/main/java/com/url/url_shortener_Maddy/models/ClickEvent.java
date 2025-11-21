package com.url.url_shortener_Maddy.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "click_event")
public class ClickEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime clickDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "url_mapping_id")   // FK -> url_mapping.id
    private UrlMapping urlMapping;
}
