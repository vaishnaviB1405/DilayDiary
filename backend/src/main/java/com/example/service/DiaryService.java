package com.example.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.DiaryEntry;
import com.example.entity.User;
import com.example.repository.DiaryRepository;

@Service
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public DiaryService(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    // Save diary
    public DiaryEntry saveDiary(DiaryEntry diaryEntry) {
        return diaryRepository.save(diaryEntry);
    }

    // Get all diaries of one user
    public List<DiaryEntry> getAllDiaries(User user) {
        return diaryRepository.findByUser(user);
    }

    // Get diary by id
    public DiaryEntry getDiaryById(Long id) {
        return diaryRepository.findById(id).orElse(null);
    }

    // Delete diary
    public boolean deleteDiary(Long id) {

        if (!diaryRepository.existsById(id)) {
            return false;
        }

        diaryRepository.deleteById(id);

        return true;
    }

    // Update diary
    public DiaryEntry updateDiary(Long id, DiaryEntry diary) {

        DiaryEntry oldDiary = diaryRepository.findById(id).orElse(null);

        if (oldDiary == null) {
            return null;
        }

        oldDiary.setTitle(diary.getTitle());
        oldDiary.setContent(diary.getContent());
        oldDiary.setMood(diary.getMood());
        oldDiary.setEntryDate(diary.getEntryDate());

        return diaryRepository.save(oldDiary);
    }

    // Get diary by date
    public DiaryEntry getDiaryByDate(User user, LocalDate date) {
        return diaryRepository
                .findByUserAndEntryDate(user, date)
                .orElse(null);
    }
    
    

}