package com.lgfh.crudspringbootreactjs.serviceimpl;

import com.lgfh.crudspringbootreactjs.domain.Person;
import com.lgfh.crudspringbootreactjs.repository.IPersonRepository;
import com.lgfh.crudspringbootreactjs.service.IPersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class PersonServiceImpl implements IPersonService {
    private final IPersonRepository personDao;

    public PersonServiceImpl(IPersonRepository personDao) {
        this.personDao = personDao;
    }


    @Override
    @Transactional(readOnly = true)
    public List<Person> getPeople() {
        return (List<Person>) personDao.findAll();
    }

    @Override
    @Transactional
    public Person savePerson(Person person) {
        return personDao.save(person);
    }

    @Override
    @Transactional
    public void deletePerson(Long personId) {
       personDao.deleteById(personId);
    }

    @Override
    @Transactional(readOnly = true)
    public Person findPerson(Person person) {
        return personDao.findById(person.getId()).orElse(null);
    }
}
