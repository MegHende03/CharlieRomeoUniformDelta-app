package com.crud.backend.controller;

import com.crud.backend.dto.auth.NotebookRequest;
import com.crud.backend.dto.auth.NotebookResponse;
import com.crud.backend.model.User;
import com.crud.backend.service.NotebookService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//NotebookController directs the traffic pertaining to notebook CRUD functions.
//NotebookController communicates with NotebookService.

//Request handler for building RESTful APIS
@RestController
//handles URL Routing path -> maps HTTP web requests
@RequestMapping("/api/notebooks")
public class NotebookController {

    //Create a NotebookService object so NotebookController can access NotebookService
    private final NotebookService notebookService;

    //Gives NotebookController access to NotebookService
    public NotebookController(NotebookService notebookService) {
        this.notebookService = notebookService;
    }

    //PostMapping routes /api/notebooks HTTP POST requests to createNotebook method.
    @PostMapping
    public NotebookResponse createNotebook(
            //makes sure request follows requirements
            @Valid @RequestBody NotebookRequest request,
            //authenticates the user
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        //takes request and user and returns response from notebookService createNotebook method.
        return notebookService.createNotebook(request, user);
    }

    //GetMapping routes /api/notebooks HTTP GET request to getNotebooks method.
    @GetMapping
    //authenticates the user and returns response from notebookServices getNotebooks method (as a list)
    public List<NotebookResponse> getNotebooks(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return notebookService.getNotebooks(user);
    }

    //PutMapping routes /api/notebooks/{id} HTTP PUT request to updateNotebook method.
    @PutMapping("/{id}")
    public NotebookResponse updateNotebook(
            //method parameter should be bound to a URL template variable
            @PathVariable Long id,
            //request must follow requirements
            @Valid @RequestBody NotebookRequest request,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        //Takes in notebook id, request, and user and returns a response from notebookService updateNotebook
        return notebookService.updateNotebook(id, request, user);
    }

    //DeleteMapping routes /api/notebooks/{id} HTTP DELETE request to deleteNotebook method.
    @DeleteMapping("/{id}")
    public void deleteNotebook(
            //method parameter should be bound to a URL template variable
            @PathVariable Long id,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        //takes notebook id and user and sends the parameters to notebookService deleteNotebook method (no return)
        notebookService.deleteNotebook(id, user);
    }
}