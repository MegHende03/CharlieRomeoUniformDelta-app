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

        //Give NoteService access to NoteRepository and NotebookRepository
        public NoteService(NoteRepository noteRepository, NotebookRepository notebookRepository) {
            this.noteRepository = noteRepository;
            this.notebookRepository = notebookRepository;
        }

        //Method to create a new Note
        //Checks if a Notebook is found before continuing
        public NoteResponse createNote(Long notebookId, NoteRequest request, User user) {
            Notebook notebook = notebookRepository.findByIdAndUserId(notebookId, user.getId())
                    .orElseThrow(() -> new BadRequestException("Notebook not found."));

            //Set a new note based on user request
            Note note = new Note();
            note.setTitle(request.getTitle());
            note.setContent(request.getContent());
            note.setNotebook(notebook);

            //officially saved note
            Note savedNote = noteRepository.save(note);

            //return a repose of the savedNote: Id, Title, Contents, CreatedAt, UpdatedAt, and notebookId
            return toResponse(savedNote);
        }

        //Method to return a list of responses of all notes by notebook
        public List<NoteResponse> getNotesByNotebook(Long notebookId, User user) {
            return noteRepository.findByNotebookIdAndNotebookUserId(notebookId, user.getId())
                    .stream() //used to transform, filter, and map database entities or APIs
                    .map(this::toResponse) //clean data transfer
                    .toList();//closes stream pipeline and turns all collected elements into a list
        }

        //Method to get a single note
        //Checks if note exists before continuing
        public NoteResponse getNote(Long noteId, User user) {
            Note note = noteRepository.findByIdAndNotebookUserId(noteId, user.getId())
                    .orElseThrow(() -> new BadRequestException("Note not found."));

            //return a repose of the note: Id, Title, Contents, CreatedAt, UpdatedAt, and notebookId
            return toResponse(note);
        }

        //Method to update the title or contents of an existing note
        //Checks if note exists before continuing
        public NoteResponse updateNote(Long notebookId, NoteRequest request, User user) {
            Note note = noteRepository.findByIdAndNotebookUserId(notebookId, user.getId())
                    .orElseThrow(() -> new BadRequestException("Note not found."));

            //set new fields
            note.setTitle(request.getTitle());
            note.setContent(request.getContent());

            //officially updated note
            Note updatedNote = noteRepository.save(note);

            //returns a response of the updated note: Id, Title, Contents, CreatedAt, UpdatedAt, and notebookI
            return toResponse(updatedNote);
        }

        //Method to delete a note from the database
        //no return response needed
        public void deleteNote(Long id, User user) {
            Note note = noteRepository.findByIdAndNotebookUserId(id, user.getId())
                    .orElseThrow(() -> new BadRequestException("Note not found."));

            noteRepository.delete(note);
        }

        //NoteResponse
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
