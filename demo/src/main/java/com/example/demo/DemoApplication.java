
package com.example.demo;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

// både Applikasjon og Rest endepunk i et program (kan deles opp)
@SpringBootApplication
@RestController
public class DemoApplication {
	// ArrayList som inneholder alle personer
	ArrayList<Person> personListe = new ArrayList<>();
	// main funksjon som kjører applikasjonen
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	// For at RESTful web service skal inkludere CORS access control headers i response, så må man legge till CrossOrigin
	@CrossOrigin
	@GetMapping("/PersonListe")
	public ArrayList<Person> hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return personListe;
	}

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
            