package com.crud.backend.service;

import com.crud.backend.dto.auth.NotebookRequest;
import com.crud.backend.dto.auth.NotebookResponse;
import com.crud.backend.exception.BadRequestException;
import com.crud.backend.model.Notebook;
import com.crud.backend.model.User;
import com.crud.backend.repository.NotebookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotebookService {

    private final NotebookRepository notebookRepository;

    public NotebookService(NotebookRepository notebookRepository) {
        this.notebookRepository = notebookRepository;
    }

    public NotebookResponse createNotebook(NotebookRequest request, User user) {
        Notebook notebook = new Notebook();
        notebook.setName(request.getName());
        notebook.setUser(user);

        Notebook savedNotebook = notebookRepository.save(notebook);

        return toResponse(savedNotebook);
    }

    public List<NotebookResponse> getNotebooks(User user) {
        return notebookRepository.findByUserId(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public NotebookResponse updateNotebook(Long id, NotebookRequest request, User user) {
        Notebook notebook = notebookRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new BadRequestException("Notebook not found."));

        notebook.setName(request.getName());

        Notebook updatedNotebook = notebookRepository.save(notebook);

        return toResponse(updatedNotebook);
    }

    public void deleteNotebook(Long id, User user) {
        Notebook notebook = notebookRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new BadRequestException("Notebook not found."));

        notebookRepository.delete(notebook);
    }

    private NotebookResponse toResponse(Notebook notebook) {
        return new NotebookResponse(
                notebook.getId(),
                notebook.getName(),
                notebook.getCreatedAt(),
                notebook.getUpdatedAt()
        );
    }
}