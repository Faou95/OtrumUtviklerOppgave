var app = new Vue({
      // element, det javascript koden skal mounte seg opp til
      el: '#app',
      // Data, brukes i expressions for å hente data fra JS
      data: {
        // en liste med personer som vi bruker senere
        personer: [],
      },
      // kjører hvis "el:" er definert. Hvis ikke kan man kjøre manuelt i console med $mount(el)
      // les mer om lifecycle på https://vuejs.org/v2/guide/instance.html
      mounted() {
        // fetchapi, må gjøre url'en CORS vennlig før bruk
        fetch("http://localhost:8080/PersonListe")
            // converterer response til JSON format
            .then(response => response.json())
            // legger all data'en inn til "personer" listen som er definert over
            .then((data) => {
                this.personer = data;
            })
      },
      // template, renderer 1 element (kan bruke flere elementer hvis det ligger i 1 div)
      // foreach loop som printer alle personer ut med li tag (bruk .JSONheader for å skrive ut et spesifikt json element)
      template: `
        <div>
            <li v-for="person in personer">{{person.navn}}</li>
        </div>
      `
    })