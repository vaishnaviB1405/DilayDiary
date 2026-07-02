package com.example.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
public class DiaryEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String mood;

    private LocalDate entryDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}