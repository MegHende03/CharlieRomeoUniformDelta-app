package com.crud.backend.controller;


import com.crud.backend.dto.auth.NoteRequest;
import com.crud.backend.dto.auth.NoteResponse;
import com.crud.backend.model.User;
import com.crud.backend.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/api/notebooks/{notebookId}/notes")
    public NoteResponse createNote(@PathVariable Long notebookId,
                                   @Valid @RequestBody NoteRequest request,
                                   Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return noteService.createNote(notebookId, request, user);
    }

    @GetMapping("/api/notebooks/{notebookId}/notes")
    public List<NoteResponse> getNotesByNotebook(@PathVariable Long notebookId,
                                                 Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return noteService.getNotesByNotebook(notebookId, user);
    }

    @GetMapping("/api/notes/{noteId}")
    public NoteResponse getNote(@PathVariable Long noteId,
                                Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return noteService.getNote(noteId, user);
    }

    @PutMapping("/api/notes/{noteId}")
    public NoteResponse updateNote(@PathVariable Long noteId,
                                   @Valid @RequestBody NoteRequest request,
                                   Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return noteService.updateNote(noteId, request, user);
    }

    @DeleteMapping("/api/notes/{noteId}")
    public void deleteNote(@PathVariable Long noteId,
                           Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        noteService.deleteNote(noteId, user);
    }







}
