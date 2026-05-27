package com.crud.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

    @Entity
    @Table(name = "notes")
    public class Note {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        @Column(nullable = false)
        private String title;

        @Column(columnDefinition = "TEXT")
        private String content;

        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        @ManyToOne
        @JoinColumn(name = "notebook_id", nullable = false)
        private Notebook notebook;

        @PrePersist
        public void onCreate() {
            createdAt = LocalDateTime.now();
            updatedAt = LocalDateTime.now();

        }
        @PreUpdate
        public void onUpdate() {
            updatedAt = LocalDateTime.now();
        }

        public long getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public String getContent() {
            return content;
        }

        public Notebook getNotebook() {
            return notebook;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public LocalDateTime getUpdatedAt() {
            return updatedAt;
        }

        public void setId(long id) {
            this.id = id;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public void setNotebook(Notebook notebook) {
            this.notebook = notebook;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }

        public void setUpdatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
        }
    }
