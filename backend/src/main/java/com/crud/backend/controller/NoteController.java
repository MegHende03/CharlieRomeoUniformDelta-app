package com.crud.backend.controller;


import com.crud.backend.dto.auth.NoteRequest;
import com.crud.backend.dto.auth.NoteResponse;
import com.crud.backend.model.User;
import com.crud.backend.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
//NoteController directs the traffic pertaining to note CRUD functions.
//NoteController communicates with NoteService.

//Request handler for building RESTful APIS
@RestController
public class NoteController {

    //Create a noteService object for NoteController
    private final NoteService noteService;

    //Gives NoteController access to NoteService
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    //PostMapping routes /api/notebooks/{notebookId}/notes HTTP POST request to the createNote method.
    @PostMapping("/api/notebooks/{notebookId}/notes")
    //When API endpoint is hit -> direct to noteService createNote method
    // parameter should be bound to a URL template variable
    public NoteResponse createNote(@PathVariable Long notebookId,
                                   //makes sure NoteRequest meets validation requirements
                                   @Valid @RequestBody NoteRequest request,
                                   //authenticates the user
                                   Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        //returns a response from noteService createNote method.
        return noteService.createNote(notebookId, request, user);
    }

    //GetMapping routes /api/notebooks/{notebookId}/notes HTTP GET request to the getNotesByNotebook method.
    //Gets all notes related to a notebook.
    @GetMapping("/api/notebooks/{notebookId}/notes")
    //When API endpoint is hit -> direct to noteService getNoteByNotebook method
    public List<NoteResponse> getNotesByNotebook(@PathVariable Long notebookId,
                                                 Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        //return a list of the responses given by noteService getNoteByNotebook method.
        return noteService.getNotesByNotebook(notebookId, user);
    }

    //GetMapping routes /api/notes/{noteId} HTTP GET request to the getNote method.
    //Gets only one note.
    @GetMapping("/api/notes/{noteId}")
    //When API endpoint is hit -> direct to noteService getNote method
    public NoteResponse getNote(@PathVariable Long noteId,
                                Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        //return the note response given by noteService getNote method.
        return noteService.getNote(noteId, user);
    }

    //PutMapping routes /api/notes/{noteId} HTTP Put request to the updateNote method.
    @PutMapping("/api/notes/{noteId}")
    public NoteResponse updateNote(@PathVariable Long noteId,
                                   @Valid @RequestBody NoteRequest request,
                                   Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        //returns a note response from noteService updateNote method
        return noteService.updateNote(noteId, request, user);
    }

    //DeleteMapping routes /api/notes/{noteId} HTTP DELETE request to the deleteNote method.
    @DeleteMapping("/api/notes/{noteId}")
    public void deleteNote(@PathVariable Long noteId,
                           Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        //calls noteService deleteNote method.
        noteService.deleteNote(noteId, user);
    }







}
