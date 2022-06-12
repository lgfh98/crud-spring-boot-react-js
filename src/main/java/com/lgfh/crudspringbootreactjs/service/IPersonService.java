package com.lgfh.crudspringbootreactjs.service;

import com.lgfh.crudspringbootreactjs.domain.Person;

import java.util.List;

public interface IPersonService {

    public List<Person> getPeople();

    public void savePerson(Person person);

    public void deletePerson(Person person);

    public Person findPerson(Person person);
}
