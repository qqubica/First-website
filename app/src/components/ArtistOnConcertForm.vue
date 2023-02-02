<template>
  <main>
    <h2>{{ $t('title') }}</h2>
    <v-sheet
        rounded
        max-width="1200"
        color="transparent"
    >
      <v-form ref="artistOnConcertForm">
        <v-container>
          <v-select
              ref="artist"
              v-model="formData.artist"
              :items="artists"
              item-title="name"
              item-value="id"
              :label="$t('artist')"
              :rules="artistRules"
              :disabled="formMode == 'details'"
              variant="outlined"
              class="pa-2 input-field"
          ></v-select>
          <v-select
              ref="venue"
              v-model="formData.venue"
              :items="concerts"
              item-title="venue"
              item-value="id"
              :label="$t('venue')"
              :rules="venueRules"
              :disabled="formMode == 'details'"
              variant="outlined"
              class="pa-2 input-field"
          ></v-select>
          <v-text-field
              ref="performanceId"
              v-model="formData.performanceId"
              :label="$t('performanceId')"
              :rules="performanceIdRules"
              :hint="$t('performanceId')"
              :disabled="formMode == 'details'"
              variant="outlined"
              type="number"
              class="pa-2 input-field"
          ></v-text-field>
          <v-text-field
              ref="duration"
              v-model="formData.duration"
              :label="$t('durationDescription')"
              :rules="durationRules"
              :hint="$t('durationDescription')"
              :disabled="formMode == 'details'"
              variant="outlined"
              type="number"
              class="pa-2 input-field"
          ></v-text-field>
          <div >
            <v-btn
                :class="'ma-2 ' + formMode == 'details' ? 'button-edit': 'button-add'"
                @click="onSubmit"
                :color="formMode == 'details' ? '#f39c12':''"
            >{{ $t(this.formMode + 'Button') }}</v-btn>
            <v-btn
                class="ma-2 button-cancel"
                @click="cancelForm"
            >{{ $t('cancel') }}</v-btn>
          </div>
        </v-container>
      </v-form>
    </v-sheet>
  </main>
</template>

<script>

import axios from "axios";

export default {
  name: "ArtistOnConcertForm",

  data(){
    return{
      formData: {},
      artists: [],
      concerts: [],
      artistRules: [
        (v) => v ? true: this.$t('required'),
      ],
      venueRules: [
        (v) => v ? true: this.$t('required'),
      ],
      durationRules: [
        (v) => v ? true: this.$t('required'),
      ],
      performanceIdRules: [
        (v) => v ? true: this.$t('required'),
      ],
    }
  },
  props:{
    id: {
      type: String,
      required: false,
    },
    mode: {
      type: String,
      required: false,
    }
  },
  created() {
    if (this.artistOnConcertId){
      this.getArtistOnConcert()
          .then(apiResponse => {
                this.formData = this.adaptArtistOnConcert(apiResponse.data)
              }
          )
    }
    this.getArtists()
        .then(apiResponse => {
          this.artists = this.adaptArtists(apiResponse.data)
        })
    this.getConcerts()
        .then(apiResponse => {
          this.concerts = this.adaptConcerts(apiResponse.data)
        })
  },
  methods: {
    async getArtistOnConcert(){
      return axios
          .get('http://localhost:3000/api/artistOnConcert/' + this.artistOnConcertId, {
            headers: {
              Authorization: 'Bearer ' + this.$loginData().token
            }})
          .catch(err => {
            console.log(err)
          })
    },
    adaptArtistOnConcert(data){
      return {
        id: data.Id,
        artist: {
          id: data.ArtistId,
          name: data.artistOnConcert.FirstName + ' ' + data.artistOnConcert.LastName + (data.artistOnConcert.Pseudonym ? (' (' + data.artistOnConcert.Pseudonym + ')'): '')
        },
        venue: {
          id: data.ConcertId,
          venue: data.performedDuring.Venue,
        },
        performanceId: data.PerformanceNumber,
        duration :data.PerformanceTime,
      }
    },
    async getArtists(){
      return axios
          .get('http://localhost:3000/api/artist')
          .catch(error => {
            console.log(error);
          })
    },
    adaptArtists(data){
      return data.map(data => {
        return {
          id: data.Id,
          name: data.FirstName + ' ' + data.LastName + (data.Pseudonym ? (' (' + data.Pseudonym + ')'): '')
        }
      })
    },
    async getConcerts(){
      return axios
          .get('http://localhost:3000/api/concert')
          .catch(error => {
            console.log(error);
          })
    },
    adaptConcerts(data){
      return data.map(data => {
        return {
          id: data.Id,
          venue: data.Venue,
        }
      })
    },
    async onSubmit(){
      if (this.formMode == 'details'){
        return this.$router.push({name: 'artistOnConcertForm', params: {id: this.formData.id, mode: 'edit'}})
      }
      if((await this.$refs.artistOnConcertForm.validate()).valid){
        this.submitForm();
      }
    },
    submitForm(){
      if (this.formMode == 'add'){
        let data = {
          ArtistId: this.formData.artist ,
          ConcertId: this.formData.venue ,
          PerformanceNumber: this.formData.performanceId ,
          PerformanceTime: this.formData.duration
        }
        return axios
            .post('http://localhost:3000/api/artistOnConcert',
                data, {
                  headers: {
                    Authorization: 'Bearer ' + this.$loginData().token
                  }})
            .then(()=>{
              this.$refs.artistOnConcertForm.reset()
              this.$router.push({name: 'artistOnConcert'})
            })
            .catch((err) => {
              console.log(err)
            })
      }
      if (this.formMode == 'edit'){
        let data = {
          ArtistId: this.formData.artist.id ,
          ConcertId: this.formData.venue.id ,
          PerformanceNumber: this.formData.performanceId ,
          PerformanceTime: this.formData.duration
        }
        return axios
            .put('http://localhost:3000/api/artistOnConcert/' + this.formData.id,
                data, {
                  headers: {
                    Authorization: 'Bearer ' + this.$loginData().token
                  }})
            .then(()=>{
              this.$refs.artistOnConcertForm.reset()
              this.$router.push({name: 'artistOnConcert'})
            })
            .catch((err) => {
              console.log(err)
            })
      }
    },
    cancelForm(){
      this.$router.push({ name: 'artistOnConcert' })
    },

  },
  computed:{
    artistOnConcertId(){
      return this.$route.params?.id
    },
    formMode(){
      if (this.$route.params.mode){
        return this.$route.params.mode
      }
      return this.$route.fullPath.split('/').pop()
    }
  },
}
</script>

<style>

html {
  background-color: #fff9f0 ;
  font-family: sans-serif;
}

body {
  min-width: 600px;
}

p {
  margin-top: 32px;
}

header,
main,
footer {
  background-color: #ffd699;
}

header,
main,
footer,
nav {
  margin: 1rem;
}

header,
footer {
  background-color: #ff9800;
  color: black;
  padding: 1rem;
}

nav {
  background-color: #ffad33 ;
}

nav ul {
  display: flex;
  padding: 0;
  list-style-type: none;
}

nav ul li a {
  display: inline-block;
  color: #2c3e50;
  padding: 1rem 2rem;
  text-decoration: none;
}

nav ul li a:hover {
  background-color: #ff9800 ;
  color: #ecf0f1;
}

nav ul li a.active {
  background-color: #804d00 ;
  color: #ecf0f1;
}

main {
  padding: 1.5rem;
}

footer {
  text-align: center;
}

main h2 {
  border-bottom: 1px solid #fff9f0 ;
  margin-bottom: 2rem;
}

.table-list {
  border-collapse: collapse;
  color: #2c3e50;
  width: 100%;
}

.table-list,
.table-list th,
.table-list td {
  border: 1px solid #bdc3c7;
}

.table-list th,
.table-list td {
  padding: 0.5rem;
}

.table-list th,
.table-list tbody tr:nth-child(even) {
  background-color: #ffebcc;

}

.table-list tbody tr:nth-child(odd){
  background-color: #ecf0f1 ;
}

.list-actions {
  margin: 0;
  text-align: center;
  list-style-type: none;
  padding: 0;
}

.list-actions li {
  display: inline-block;
}

.list-actions-button-details,
.list-actions-button-edit,
.list-actions-button-delete {
  display: inline-block;
  width: 75px;
  padding: 0.25rem 0.5rem;
}

.list-actions-button-details,
.list-actions-button-edit,
.list-actions-button-delete,
.button-add,
.form-button-submit,
.form-button-cancel {
  border: none;
  border-radius: 5px;
  color:white;
  text-decoration: none;
  text-align: center;
  font-size: 0.8rem;
}

.list-actions-button-details,
.list-actions-button-edit {
  margin-right: 1rem;
}

.button-edit,
.button-details {
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  display: inline-block;
  width: 75px;
  border: none;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 0.8rem;
}

.button-details{
  background-color: #2980b9;
}

.button-details:hover{
  background-color: #3498db;
}

.button-edit{
  background-color: #f39c12;
}

.button-edit:hover{
  background-color: #f1c40f

}

.list-actions-button-details {
  background-color: #2980b9;
}

.list-actions-button-details:hover {
  background-color: #3498db;
}

.list-actions-button-edit {
  background-color: #f39c12;
}

.list-actions-button-edit:hover {
  background-color: #f1c40f
}

.list-actions-button-delete {
  background-color: #c0392b;
}

.form-button-cancel:hover,
.list-actions-button-delete:hover {
  background-color: #e74c3c;
}

.button-add,
.form-button-submit,
.form-button-cancel {
  padding: 0.5rem 1rem;
}

.button-add,
.form-button-submit {
  background-color: #27ae60;
}

.button-add:hover,
.form-button-submit:hover {
  background-color: #2ecc71;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

textarea {
  overflow: auto;
}

.form select,
.form input[type="text"],
.form input[type="number"],
.form input[type="date"],
.form input[type="email"] {
  border: 1px solid #7f8c8d;
  color: #2c3e50;
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
}

.form label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.5em;
}

.symbol-required {
  color: #c0392b;
}

.form-buttons{
  grid-column: 1/ span 2;
}

.form-button-submit,
.form-button-cancel {
  width: 100%;
}

.form-button-cancel {
  background-color: #ee4834;
  box-sizing: border-box;
}

.form-button-submit {
  margin-bottom: 0.5rem;
}

.form input.error-input,
.form select.error-input {
  border: 1px solid red;
}

.errors-text {
  display: block;
  font-size: 0.85em;
  line-height: 2.25rem;
  margin-top: 0.5em;
  color: #e74c3c;
}

</style>



<i18n>
{
  "pl": {
    "title": "Dodaj występ",
    "required": "Pole jest wymagane",
    "max50": "Maksimum do 50 znaków",
    "max100": "Maksimum do 100 znaków",
    "min2": "Minimum 2 znaki",
    "min2max50": "od 2 do 50 znaków",
    "min2max100": "od 2 do 100 znaków",
    "max200": "Do 200 znaków",
    "notDate": "To nie jest data",
    "timeTravel": "Witam podróżniku w czasie",
    "artistList": "Lista artystów",
    "details": "Szczegóły",
    "edit": "Edytuj",
    "delete": "Usuń",
    "emptyList": "Nie ma nic do wyświetlenia",
    "addNew": "Dodaj nowy westęp",
    "artist": "Artysta",
    "venue": "Lokalizacja",
    "pseudonym": "Pseudonim",
    "birthdate": "Data urodzenia",
    "concert": "Koncert",
    "actions": "Akcje",
    "cancel": "Anuluj",
    "durationDescription": "Czas trwania występu",
    "performanceId": "Który to występ na koncercie",
    "detailsButton": "Edytuj",
    "editButton": "Zapisz zmiany",
    "addButton": "Dodaj"
  },
  "en": {
    "title": "Add performance",
    "required": "It's required",
    "max50": "50 characters max",
    "max100": "100 characters max",
    "min2": "2 characters min",
    "min2max50": "min 2 characters max 50",
    "min2max100": "min 2 characters max 50",
    "max200": "Max 200 characters",
    "notDate": "It's not a date",
    "timeTravel": "Welcome time traveler",
    "artistList": "Artist list",
    "details": "Details",
    "edit": "Edit",
    "delete": "Delete",
    "emptyList": "No performances to display",
    "addNew": "Add new performance",
    "artist": "Artist",
    "venue": "Venue",
    "pseudonym": "Pseudonym",
    "birthdate": "Birth date",
    "concert": "Concert",
    "actions": "Actions",
    "cancel": "Cancel",
    "durationDescription": "Performance duration",
    "performanceId": "Which performance during the concert it is",
    "detailsButton": "Edit",
    "editButton": "Save changes",
    "addButton": "Add"
  }
}
</i18n>
