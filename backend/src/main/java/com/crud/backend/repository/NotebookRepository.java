package com.crud.backend.repository;

import com.crud.backend.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
//NotebookRepository communicates with the relational database.
//Builds the necessary SQL code (using Hibernate) to be inserted into the database.

public interface NotebookRepository extends JpaRepository<Notebook, Long> {
    List<Notebook> findByUserId(Long userId);

    Optional<Notebook> findByIdAndUserId(Long notebookId, Long userId);
}
