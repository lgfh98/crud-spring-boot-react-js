package com.lgfh.crudspringbootreactjs.repository;

import com.lgfh.crudspringbootreactjs.domain.Person;
import org.springframework.data.repository.CrudRepository;

public interface IPersonRepository extends CrudRepository<Person, Long> {

}
