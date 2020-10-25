# OtrumUtviklerOppgave
Oppgave fra Otrum


STEPS

installerte og satt opp gradle

satt opp spring boot og testet med https://spring.io/quickstart

for å kjøre applikasjonen så bruker jeg terminal vinduet i Intellij og kjører kommandoen "gradlew bootrun"
stopper gradle med kommandoen "ctrl + c"

lagde en person klasse med navn og alder og getters

La til ID for person (auto-increment med en statisk count variable)

fant ut hva POJO var og hvordan spring boot behandler en POJO

Spring Boot bruker Jackson til å konvertere en POJO til JSON format når man bruker Rest

kanskje bruke RestTemplate?

testet RestTemplate https://spring.io/guides/gs/consuming-rest/#initial

Trengte ikke å bruke RestTemplate fordi jeg fant ut man kan sende en List og Jackson vil sende en JSON liste

La til en @Component ApplicationRunner for å fylle ut en Person Liste når applikasjonen starter

Bruker notasjonen @GetMapping for å sende ut en forhånds definert Person Liste til front-end via Rest endepunkt

Fikk en CORS error når jeg prøvde @GetMapping men fikset det med å bruke @CrossOrigin

Begynte med Vue og Vuetify, valgte å bruke CDN versjonen av begge (for utvikling)

Begynte med index.html og main.js på frontend

Gikk deretter over til vuetifyIndex.html og vuetifyMain.js for å teste Vuetify

Lagde en template der den dynamisk vil legge til 2 text-fields (navn og alder) og en "x" knapp for å slette en person
Bruker en v-for loop for å gå gjennom person listen og legge til rekker med personer

Begynte på funksjonaliteten for å slette en person
Fant ut av at Fetch Api er veldig nytt og de fleste bruker Axios for since HTTP kall
Bestemte meg for å jobbe rundt dette med å ikke bruke DELETE men GET istedet (cors compliant)
Bruker også @GetMapping notasjonen i back-end (cors compliant)
Funksjonaliteten funker, men man skal selvfølgelig bruke DELETE når man sletter (finner kanskje en fix senere)
Sletter en bruker ved å sammenligne ID "personListe.removeIf(p -> p.getId() == id);" med @RequestParam som henter ID
Knappen i front-end har en @click som kjører funksjonen "deletePerson(person.id)" og sender inn personens ID

La til en "Reload" knapp for å refreshe listen (front-end)
Sender en GET og henter Person Listen fra backend og oppdaterer front-end dynamisk med template i vuetifyMain.JS
der jeg legger til data'en (JSON) jeg får fra back-end inn i front-end sin person liste

La til en "+ Add" knapp for å legge til en rekke i front-end der brukeren kan skrive inn den nye brukeren
Testet dette i backend med @PostMapping notasjonen og det funket med test data (JSON) for 1 person
Lagde en funksjon som la til en "empty" person i front-end sin person liste sånn at det vil dynamisk dukke opp ekstra linje med 2 text fields og 1 x knapp (x knappen funker ikke siden personen ikke har en ID, men linjen vil bli slettet i front-end hvis man trykker på reload)
Prøvde å utvide dette til en JSON liste istedet for 1 person ved å sende Front-end sin person liste men fikk error 400 konstant (pga feil type sendt data)
Etter jeg søkte opp erroren så fant jeg ut av det. Må bruke List istedet for ArrayList i @RequestBody

Nå kan jeg lagre en person i back-end ved å sende inn en JSON liste fra fra front-end
Når back-end mottar JSON listen så vil den først slette alle brukere fra den gamle listen og legge til den nye listen fra front-end (TODO sammenligne ID og beholde alle som har samme ID og slette de som ikke eksiterer)

Siste men ikke minst, lagre forrandringen som skjer i front-end (når text-fields blir forandret)
Bruker vuetify sine v-text-fields med v-model="person.navn" for første text-field og v-model="person.alder" i andre tekstfield
Begge feltene tar i bruk @change som vil kjøre en funksjon etter feltet har blitt forandret
Etter et felt har blitt forandret, så går vi gjennom front-end sin person liste og sammenligner ID for å finne ut hvilken person som endret navn/alder. Etter det så setter den bare this.personer[i].navn/alder = navn/alder

Dette blir ikke lagret før man klikker Save.
