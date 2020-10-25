
package com.example.demo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

// både Applikasjon og Rest endepunk i et program (kan deles opp)
@SpringBootApplication
// For at RESTful web service skal inkludere CORS access control headers i response, så må man legge till CrossOrigin
@CrossOrigin
@RestController
public class DemoApplication {
	// ArrayList som inneholder alle personer
	List<Person> personListe = new ArrayList<>();
	// main funksjon som kjører applikasjonen
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	// REST GET som sender person listen til front-end
	@GetMapping("/PersonListe")
	public List<Person> personListe() {
		return personListe;
	}

	// REST GET (skal egentlig være DELETE, men funker ikke enda med Fetch API) som sletter en person ved å sammenligne ID
	@GetMapping("/SlettPerson")
	// @RequestParam vil hente inn ID
	public void slettPerson(@RequestParam(value = "id") int id){
		personListe.removeIf(p -> p.getId() == id);
	}

	// REST POST som vil få inn en JSON liste med personer fra front-end i @RequestBody
	@PostMapping(path = "/leggTilPerson", consumes = "application/json")
	public void leggTilPerson(@RequestBody List<Person> person){
		// Sletter alle personer fra back-end sin person liste
		personListe.clear();
		// Legger til alle personer fra front-end sin person liste
		for (Person p : person) {
			personListe.add(new Person(p.getNavn(), p.getAlder()));
			System.out.println(p.getNavn());
		}
	}

	// En Component ApplicationRunner som kjører og legger til eksempel data i person listen med engang applikasjonen starter
	@Component
	public class ApplicationRunnerBean implements ApplicationRunner {
		@Override
		public void run(ApplicationArguments arg0) throws Exception {
			personListe.add(new Person("Phuc Cao Tran", 25));
			personListe.add(new Person("Dat Cao Tran", 33));
			personListe.add(new Person("Minh Cao Tran", 60));
			personListe.add(new Person("Gai Thi Dang", 57));
		}
	}

}
            