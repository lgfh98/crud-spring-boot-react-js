package com.lgfh.crudspringbootreactjs.controller;

import com.lgfh.crudspringbootreactjs.domain.Person;
import com.lgfh.crudspringbootreactjs.serviceimpl.PersonServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin("http://localhost:3000")
public class ApiController {

    private final PersonServiceImpl personService;

    public ApiController(PersonServiceImpl personService) {
        this.personService = personService;
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping(path = "/person") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<Person> addPerson(@Valid @RequestBody Person person) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        /*
         * Este tipo de metodos me obliga a manejar dos tipos de errores en el Front
         *
         * El primero sucede cuando se completa la peticion pero no se detiene la respuesta de Java, la cual se entrega eon un objeto de error en el front. Lo anterior debido al uso de ResponseEntity, @Valid Y HttpStatus.OK. Este error no se atrapa en el front con try catch, porque en teoria no sucede, solo se me notifica que sucede, es decir no es un error que no se este controlando
         * Ejemplo: metodo addPerson()
         *
         * El segundo error es cuando ocurre otro tipo de excepcion  que si es atrapada en el front por try catch, es decir, al igual que el primero tambien se completa, pero ahora el flujo no es el del bloque try, sino que se ejecuta el codigo en el bloque catch
         * Ejemplo: updatePerson()
         *
         * Nota: La diferencia mas marcada es en el lado del front porque excepciones que ocurren aca donde estoy escribiendo este comentario en teoria son atrapadas por el metodo del final llamado: handleValidationExceptions, pero no es en teoria y no lo voy a probar porque me da perecita
         * */


        return new ResponseEntity<>(personService.savePerson(person), HttpStatus.OK);
    }

    @DeleteMapping(path = "/person/{personId}")
    public @ResponseBody void deletePerson(@Valid @PathVariable Long personId) {
        personService.deletePerson(personId);
    }

    @PutMapping("/person")
    public @ResponseBody ResponseEntity<Person> updatePerson(@Valid @RequestBody Person person) {
        return new ResponseEntity<>(personService.savePerson(person), HttpStatus.OK);
    }

    @GetMapping(path = "/persons/{personId}")
    public @ResponseBody Person getPerson(@Valid @PathVariable Long personId) {
        Person n = new Person();
        n.setId(personId);
        return personService.findPerson(n);
    }


    @GetMapping(path = "/persons")
    public @ResponseBody Iterable<Person> getPeople() {
        // This returns a JSON or XML with the users
        return personService.getPeople();
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    // Aca puedo poner las demas expcepciones que maneje mi proyecto
    @ExceptionHandler({MethodArgumentNotValidException.class, Exception.class})
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex, Exception otraXDReportJunglaManco) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
