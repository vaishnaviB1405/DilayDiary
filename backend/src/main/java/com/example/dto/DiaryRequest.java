package com.example.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class DiaryRequest {
   private String title;
   private String content;
   private String mood;
   private LocalDate entryDate;
}
