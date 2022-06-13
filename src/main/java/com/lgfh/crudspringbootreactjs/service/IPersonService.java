package com.lgfh.crudspringbootreactjs.service;

import com.lgfh.crudspringbootreactjs.domain.Person;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IPersonService {

    public List<Person> getPeople();

    public Person savePerson(Person person);

    public void deletePerson(Long personId);

    public Person findPerson(Person person);
}
