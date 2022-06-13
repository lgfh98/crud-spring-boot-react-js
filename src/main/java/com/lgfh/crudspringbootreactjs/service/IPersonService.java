package com.lgfh.crudspringbootreactjs.service;

import com.lgfh.crudspringbootreactjs.domain.Person;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IPersonService {

    List<Person> getPeople();

    Person savePerson(Person person);

    void deletePerson(Long personId);

    Person findPerson(Person person);
}
