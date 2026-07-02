package com.example.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.entity.DiaryEntry;
import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.security.JwtService;
import com.example.service.DiaryService;

@RestController
@RequestMapping("/api/diary")
@CrossOrigin(origins = "http://localhost:5173")
public class DiaryController {

    private final DiaryService diaryService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public DiaryController(
            DiaryService diaryService,
            JwtService jwtService,
            UserRepository userRepository) {

        this.diaryService = diaryService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    // Save Diary
    @PostMapping
    public ResponseEntity<DiaryEntry> saveDiary(
            @RequestBody DiaryEntry diary,
            @RequestHeader("Authorization") String authHeader) {

        String email = jwtService.getEmailFromHeader(authHeader);

        User user = userRepository.findByEmail(email).orElseThrow();

        diary.setUser(user);

        return ResponseEntity.ok(diaryService.saveDiary(diary));
    }

    // Get All Diaries
    @GetMapping
    public ResponseEntity<List<DiaryEntry>> getMyDiaries(
            @RequestHeader("Authorization") String authHeader) {

        String email = jwtService.getEmailFromHeader(authHeader);

        User user = userRepository.findByEmail(email).orElseThrow();

        return ResponseEntity.ok(diaryService.getAllDiaries(user));
    }

    // Get Diary By Id
    @GetMapping("/{id}")
    public ResponseEntity<DiaryEntry> getDiaryById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        String email = jwtService.getEmailFromHeader(authHeader);
        System.out.println("Logged Email = " + email);

        User user = userRepository.findByEmail(email).orElseThrow();
        System.out.println("Logged User ID = " + user.getId());

        DiaryEntry diary = diaryService.getDiaryById(id);

        if (diary == null) {
            System.out.println("Diary not found");
            return ResponseEntity.notFound().build();
        }

        System.out.println("Diary User ID = " + diary.getUser().getId());

        if (!diary.getUser().getId().equals(user.getId())) {
            System.out.println("Access Denied");
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(diary);
    }

    // Get Diary By Date
    @GetMapping("/date/{date}")
    public ResponseEntity<DiaryEntry> getDiaryByDate(
            @PathVariable LocalDate date,
            @RequestHeader("Authorization") String authHeader) {

        String email = jwtService.getEmailFromHeader(authHeader);

        User user = userRepository.findByEmail(email).orElseThrow();

        DiaryEntry diary = diaryService.getDiaryByDate(user, date);

        if (diary == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(diary);
    }

    // Update Diary
    @PutMapping("/{id}")
    public ResponseEntity<DiaryEntry> updateDiary(
            @PathVariable Long id,
            @RequestBody DiaryEntry diary) {

        DiaryEntry updated = diaryService.updateDiary(id, diary);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    // Delete Diary
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDiary(
            @PathVariable Long id) {

        boolean deleted = diaryService.deleteDiary(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("Diary Deleted Successfully");
    }
}