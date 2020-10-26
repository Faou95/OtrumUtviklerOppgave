var app = new Vue({
      // element, det javascript koden skal mounte seg opp til
      el: '#app',
      vuetify: new Vuetify(),
      // Data, brukes i expressions for å hente data fra JS
      data: {
        // en liste med personer som vi bruker senere
        personer: [],
        // Regler for hva som er gyldig input for text-fields
        navnRules: [
            v => !!v || 'Required.',
            v => /^[A-Z a-z]+$/.test(v) || 'Letters only',
        ],
        alderRules: [
            v => !!v || 'Required.',
            v => /^[1-9]?[0-9]{1}$|^120$/.test(v) || 'Numbers only',
        ],
      },
      // alle metoder som kan kjøres
      methods: {
        // DeletePerson kjører HTTP DELETE for å slette en person med ID
        deletePerson(id){
            axios.delete("http://localhost:8080/SlettPerson?id=" + id)
            .then(response => console.log('Success', response))
            .catch(error => console.log(error))
            //fetch("http://localhost:8080/SlettPerson?id=" + id)
        },
        // Reload funksjon som kjører Fetch (GET) for å hente inn personer fra back-end REST endepunkt
        reload: function() {
            fetch("http://localhost:8080/PersonListe")
                // converterer response til JSON format
                .then(response => response.json())
                // legger all data'en inn til "personer" listen som er definert over
                .then((data) => {
                    this.personer = data;
                })
        },
        // Save som lagrer front-end sin person liste til back-end
        save: function() {
            // Header som definerer hva som blir sendt (CORS compliant)
            const headers = {
                  'Content-Type': 'application/json',
              };
            axios.post("http://localhost:8080/leggTilPerson", JSON.stringify(this.personer), {headers})
                .then(response => console.log('Success', response))
                .catch(error => console.log(error))
            /** UTDATERT Fetch API metode
            fetch("http://localhost:8080/leggTilPerson", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.personer),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            */
        },
        // Add funksjon for å legge til en ekstra rad i front-end
        add: function() {
            const data = {navn: "", alder: 0}
            this.personer.push(data)
        },
        // ChangeNavn for å endre en eksisterende bruker i front-end sin personliste (trykk på Save for å lagre til back-end)
        changeNavn: function(navn, id) {
            console.log(navn + " " + id);
            for(var i = 0; i < this.personer.length; i++){
                if(this.personer[i].id == id){
                    this.personer[i].navn = navn;
                    break;
                }
            }
        },
        // ChangeAlder for å endre en eksisterende bruker i front-end sin personliste (trykk på Save for å lagre til back-end)
        changeAlder: function(alder, id) {
            console.log(alder + " " + id);
            for(var i = 0; i < this.personer.length; i++){
                if(this.personer[i].id == id){
                    this.personer[i].alder = alder;
                    break;
                }
            }
        }
      },
      // kjører hvis "el:" er definert. Hvis ikke kan man kjøre manuelt i console med $mount(el)
      mounted() {
      axios.get("http://localhost:8080/PersonListe")
      .then(response => {
        this.personer = response.data
      })
      .catch(error => console.log(error))
      /** UTDATERT Fetch API metode
        // fetchapi, må gjøre url'en CORS vennlig før bruk
        fetch("http://localhost:8080/PersonListe")
            // converterer response til JSON format
            .then(response => response.json())
            // legger all data'en inn til "personer" listen som er definert over
            .then((data) => {
                this.personer = data;
            }) */
      },
      // template, renderer 1 element (kan bruke flere elementer hvis det ligger i 1 div)
      // foreach loop som printer alle personer ut i text-fields med navn og alder og en knapp for å slette
      template: `
          <v-container>
              <div v-for="person in personer" v-bind:key="person.id">
                  <v-row justify="center" align="center">
                      <v-col sm="4">
                          <v-text-field :rules="navnRules" v-model="person.navn" @change="changeNavn(person.navn, person.id)" outlined></v-text-field>
                      </v-col>
                      <v-col sm="1">
                          <v-text-field :rules="alderRules" v-model.number="person.alder" @change="changeAlder(person.alder, person.id)" outlined></v-text-field>
                      </v-col>
                      <v-col>
                          <v-btn large @click="deletePerson(person.id)">x</v-btn>
                      </v-col>
                  </v-row>
              </div>
                    <v-btn large @click="add">+ Add</v-btn>
              <v-row>
                <v-spacer></v-spacer>
                <v-col sm="9">
                    <v-btn large @click="reload">Reload</v-btn>
                    <v-btn large @click="save">Save</v-btn>
                </v-col>
              </v-row>
          </v-container>
            `
          })