package com.crud.backend.controller;

import com.crud.backend.dto.auth.NotebookRequest;
import com.crud.backend.dto.auth.NotebookResponse;
import com.crud.backend.model.User;
import com.crud.backend.service.NotebookService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notebooks")
public class NotebookController {

    private final NotebookService notebookService;

    public NotebookController(NotebookService notebookService) {
        this.notebookService = notebookService;
    }

    @PostMapping
    public NotebookResponse createNotebook(
            @Valid @RequestBody NotebookRequest request,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return notebookService.createNotebook(request, user);
    }

    @GetMapping
    public List<NotebookResponse> getNotebooks(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return notebookService.getNotebooks(user);
    }

    @PutMapping("/{id}")
    public NotebookResponse updateNotebook(
            @PathVariable Long id,
            @Valid @RequestBody NotebookRequest request,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return notebookService.updateNotebook(id, request, user);
    }

    @DeleteMapping("/{id}")
    public void deleteNotebook(
            @PathVariable Long id,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        notebookService.deleteNotebook(id, user);
    }
}