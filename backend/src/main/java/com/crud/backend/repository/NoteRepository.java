package com.crud.backend.repository;

import com.crud.backend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

//NoteRepository communicates with the database.
//Builds the necessary SQL code (using Hibernate) to be inserted into the database.
//This includes tables, attributes, entities, relationships, etc.

//JpaRepository: Spring Data interface that contains pre-built methods for database operations.
//NoteRepository uses JpaRepository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByNotebookIdAndNotebookUserId(Long notebookId, Long userId);

    Optional<Note> findByIdAndNotebookUserId(Long noteId, Long userId);
}