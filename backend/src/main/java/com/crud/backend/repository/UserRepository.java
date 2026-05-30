package com.crud.backend.repository;
import com.crud.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//Repository communicates with the database. Builds the necessary SQL code to be inserted into the database.

//Uses JPA (Jakarta Persistence API) specification to simplify how Java applications interact with relational databases.
//Hibernate (ORM) is used to execute the database commands. Converts Java objects into database rows.
//"extends" allows us to inherit all the built-in database methods from Springs framework.
//JpaRepository: Spring Data interface that contains pre-built methods for database operations.
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
