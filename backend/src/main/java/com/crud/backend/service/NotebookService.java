package com.crud.backend.service;

import com.crud.backend.dto.auth.NotebookRequest;
import com.crud.backend.dto.auth.NotebookResponse;
import com.crud.backend.exception.BadRequestException;
import com.crud.backend.model.Notebook;
import com.crud.backend.model.User;
import com.crud.backend.repository.NotebookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

//marks class as service layer component.
//Service contains the core business logic for notebooks
//Service receives request from Controller. Service communicates with repository.
@Service
public class NotebookService {

    //Initialize NotebookRepository object to allow NotebookService to communicate
    private final NotebookRepository notebookRepository;

    //Gives NotebookService access to notebookRepository
    public NotebookService(NotebookRepository notebookRepository) {
        this.notebookRepository = notebookRepository;
    }

    //Method to create a new notebook and add it to the database via communication with notebookRepository
    public NotebookResponse createNotebook(NotebookRequest request, User user) {
        Notebook notebook = new Notebook();
        notebook.setName(request.getName());
        notebook.setUser(user);

        //Same thing as Notebook. Used to show that all User key:value pairs have been officially set.
        Notebook savedNotebook = notebookRepository.save(notebook);

        //returns response of the savedNotebook
        return toResponse(savedNotebook);
    }

    //Method to retrieve a list of all notebooks in the database created by the user.
    public List<NotebookResponse> getNotebooks(User user) {
        return notebookRepository.findByUserId(user.getId())
                .stream() //used to transform, filter, and map database entities or APIs
                .map(this::toResponse)//clean data transfer
                .toList();//closes stream pipeline and turns all collected elements into a list
    }

    //Method to update a notebooks name and save it to the database
    //Checks if notebook belongs to the user and if notebook exists before continuing.
    public NotebookResponse updateNotebook(Long id, NotebookRequest request, User user) {
        Notebook notebook = notebookRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new BadRequestException("Notebook not found."));

        //set the new name
        notebook.setName(request.getName());

        //same thing as Notebook. Purpose is to represent it's the "officially" updated note
        Notebook updatedNotebook = notebookRepository.save(notebook);

        //return a notebookResponse of the updated notebook
        return toResponse(updatedNotebook);
    }

    //Method to delete a notebook from the database
    //Checks if notebook belongs to the user and if notebook exists before continuing.
    public void deleteNotebook(Long id, User user) {
        Notebook notebook = notebookRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new BadRequestException("Notebook not found."));

        notebookRepository.delete(notebook);
    }

    //Method that takes a notebook and turns it into a NotebookResponse
    private NotebookResponse toResponse(Notebook notebook) {
        return new NotebookResponse(
                notebook.getId(),
                notebook.getName(),
                notebook.getCreatedAt(),
                notebook.getUpdatedAt()
        );
    }
}