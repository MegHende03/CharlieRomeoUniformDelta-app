package com.crud.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

    @Entity
    @Table(name = "notebooks")
    public class Notebook {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        @Column(nullable = false)
        private String name;

        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

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

        public String getName() {
            return name;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public LocalDateTime getUpdatedAt() {
            return updatedAt;
        }

        public User getUser() {
            return user;
        }

        public void setId(long id) {
            this.id = id;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }

        public void setUser(User user) {
            this.user = user;
        }

        public void setUpdatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
        }
    }
