package com.crud.backend.repository;

import com.crud.backend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByNotebookIdAndNotebookUserId(Long notebookId, Long userId);

    Optional<Note> findByIdAndNotebookUserId(Long noteId, Long userId);
}