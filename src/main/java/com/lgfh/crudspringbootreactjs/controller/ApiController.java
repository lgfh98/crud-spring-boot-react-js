package com.lgfh.crudspringbootreactjs.controller;

import com.lgfh.crudspringbootreactjs.domain.Person;
import com.lgfh.crudspringbootreactjs.serviceimpl.PersonServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin("http://localhost:3000")
public class ApiController {

    private final PersonServiceImpl personService;

    public ApiController(PersonServiceImpl personService) {
        this.personService = personService;
    }

    @GetMapping("/")
    public String index(){
       return "index";
    }

    @PostMapping(path="/person") // Map ONLY POST Requests
    public @ResponseBody void addPerson (@RequestBody Person person) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        personService.savePerson(person);
    }

    @DeleteMapping(path="/person/{personId}")
    public @ResponseBody void deletePerson(@PathVariable Long personId){
        personService.deletePerson(personId);
    }

    @PutMapping("/person")
    public @ResponseBody void updatePerson(@RequestBody Person person){
        personService.savePerson(person);
    }

    @GetMapping(path="/persons/{personId}")
    public @ResponseBody Person getPerson(@PathVariable Long personId){
        Person n = new Person();
        n.setId(personId);
        return personService.findPerson(n);
    }


    @GetMapping(path="/persons")
    public @ResponseBody Iterable<Person> getPeople() {
        // This returns a JSON or XML with the users
        return personService.getPeople();
    }
}
