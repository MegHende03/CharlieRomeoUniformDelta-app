package com.crud.backend.dto.auth;

import java.time.LocalDateTime;

public class NoteResponse {
    private Long id;
    private String title;
    private String content;
    private Long notebookId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public NoteResponse(
            Long id,
            String title,
            String content,
            Long notebookId,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.notebookId = notebookId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Long getNotebookId() {
        return notebookId;
    }
}
