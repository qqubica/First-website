<template>
  <main>
    <h2>Lista koncertow</h2>

    <table
        v-if="concerts.length > 0"
        class="table-list"
    >
      <thead>
        <tr>
          <th>{{ $t('localization') }}</th>
          <th>{{ $t('startDate') }}</th>
          <th>{{ $t('finishDate') }}</th>
          <th v-if="logedIn">{{ $t('actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="concert in concerts"
            :key="concert.id"
        >
          <td>{{ concert.venue }}</td>
          <td>{{ concert.startDate }}</td>
          <td>{{ concert.finishDate }}</td>
          <td v-if="logedIn">
            <ul class="list-actions">
              <li><a class="list-actions-button-details" @click="details(concert.id)">{{ $t('details') }}</a></li>
              <li><a class="list-actions-button-edit" @click="edit(concert.id)">{{ $t('edit') }}</a></li>
              <li><a class="list-actions-button-delete" @click="del(concert.id)">{{ $t('delete') }}</a></li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>{{ $t('emptyList') }}</p>

    <p v-if="logedIn">
      <router-link
          :to="{name: 'concertFormEmpty'}"
          class="button-add"
      >
        {{ $t('addNew') }}
      </router-link>
    </p>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "ConcertList",

  data(){
    return{
      concerts:[],
      logedIn: false,
    }
  },
  mounted() {
    this.getConcertsFromApi()
        .then(apiResponse => {
          this.concerts = this.adaptData(apiResponse.data)
        })
    this.logedIn = this.$checkLogin()
  },
  methods: {
    async getConcertsFromApi(){
      return axios
          .get('http://localhost:3000/api/concert')
          .catch(error => {
            console.log(error);
          })
    },
    adaptData(apiData){
      return apiData.map(concert => {
        return {
          id: concert.Id,
          venue: concert.Venue,
          startDate: concert.StartDate?.split('T')[0],
          finishDate: concert.FinishDate?.split('T')[0],
        }
      })
    },
    details(id){
      this.$router.push({ name: 'concertForm', params: {id: id, mode: 'details'}})
    },
    edit(id){
      this.$router.push({ name: 'concertForm', params: {id: id, mode: 'edit'}})
    },
    del(id){
      axios
          .delete('http://localhost:3000/api/concert/' + id, {
            headers: {
              Authorization: 'Bearer ' + this.$loginData().token
            }})
          .then(() => {
            this.concerts = this.concerts.filter(concert => concert.id != id)
          })
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
    "localization": "Lokalizacja",
    "startDate": "Data początka",
    "finishDate": "Data końca",
    "title": "Lista koncertów",
    "details": "Szczegóły",
    "edit": "Edytuj",
    "delete": "Usuń",
    "emptyList": "Brak koncertów do wyświetlenia",
    "addNew": "Dodaj nowy koncert",
    "name": "Imie",
    "surname": "Nazwisko",
    "pseudonym": "Pseudonim",
    "concert": "Koncert",
    "actions": "Akcje"
  },
  "en": {
    "localization": "Localization",
    "startDate": "Start data",
    "finishDate": "Finish data",
    "title": "List of artist on concerts",
    "details": "Details",
    "edit": "Edit",
    "delete": "Delete",
    "emptyList": "No performances to display",
    "addNew": "Add new performance",
    "name": "Name",
    "surname": "Surname",
    "concert": "Concert",
    "actions": "Actions"
  }
}
</i18n>