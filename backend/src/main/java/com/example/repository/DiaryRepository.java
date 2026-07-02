package com.example.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.DiaryEntry;
import com.example.entity.User;

public interface DiaryRepository extends JpaRepository<DiaryEntry, Long> {

    // Get all diaries of a user
    List<DiaryEntry> findByUser(User user);

    // Get diary by date for a user
    Optional<DiaryEntry> findByUserAndEntryDate(User user, LocalDate entryDate);

}