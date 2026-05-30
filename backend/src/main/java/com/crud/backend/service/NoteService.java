package com.crud.backend.service;

import com.crud.backend.dto.auth.NoteRequest;
import com.crud.backend.dto.auth.NoteResponse;
import com.crud.backend.exception.BadRequestException;
import com.crud.backend.model.Note;
import com.crud.backend.model.Notebook;
import com.crud.backend.model.User;
import com.crud.backend.repository.NoteRepository;
import com.crud.backend.repository.NotebookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

    //marks class as service layer component.
    //Service contains the core business logic for notes
    //Service receives request from Controller. Service communicates with repository.
    @Service
    public class NoteService {
        
        private final NoteRepository noteRepository;
        private final NotebookRepository notebookRepository;

        public NoteService(NoteRepository noteRepository, NotebookRepository notebookRepository) {
            this.noteRepository = noteRepository;
            this.notebookRepository = notebookRepository;
        }

        public NoteResponse createNote(Long notebookId, NoteRequest request, User user) {
            Notebook notebook = notebookRepository.findByIdAndUserId(notebookId, user.getId())
                    .orElseThrow(() -> new BadRequestException("Notebook not found."));

            Note note = new Note();
            note.setTitle(request.getTitle());
            note.setContent(request.getContent());
            note.setNotebook(notebook);

            Note savedNote = noteRepository.save(note);

            return toResponse(savedNote);
        }

        public List<NoteResponse> getNotesByNotebook(Long notebookId, User user) {
            return noteRepository.findByNotebookIdAndNotebookUserId(notebookId, user.getId())
                    .stream()
                    .map(this::toResponse)
                    .toList();
        }

        public NoteResponse getNote(Long noteId, User user) {
            Note note = noteRepository.findByIdAndNotebookUserId(noteId, user.getId())
                    .orElseThrow(() -> new BadRequestException("Note not found."));

            return toResponse(note);
        }

        public NoteResponse updateNote(Long notebookId, NoteRequest request, User user) {
            Note note = noteRepository.findByIdAndNotebookUserId(notebookId, user.getId())
                    .orElseThrow(() -> new BadRequestException("Note not found."));

            note.setTitle(request.getTitle());
            note.setContent(request.getContent());

            Note updatedNote = noteRepository.save(note);

            return toResponse(updatedNote);
        }

        public void deleteNote(Long id, User user) {
            Note note = noteRepository.findByIdAndNotebookUserId(id, user.getId())
                    .orElseThrow(() -> new BadRequestException("Note not found."));

            noteRepository.delete(note);
        }

        private NoteResponse toResponse(Note note) {
            return new NoteResponse(
                    note.getId(),
                    note.getTitle(),
                    note.getContent(),
                    note.getNotebook().getId(),
                    note.getCreatedAt(),
                    note.getUpdatedAt()
            );
        }








    }
