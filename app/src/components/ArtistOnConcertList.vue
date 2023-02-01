<template>
  <main>
    <h2>{{ $t('title') }}</h2>
    <table
        v-if="artistsOnConcerts.length > 0"
        class="table-list"
    >
      <thead>
        <tr>
          <th>{{ $t('name') }}</th>
          <th>{{ $t('surname') }}</th>
          <th>{{ $t('pseudonym') }}</th>
          <th>{{ $t('concert') }}</th>
          <th v-if="logedIn">{{ $t('actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="artistOnConcert in artistsOnConcerts"
            :key="artistOnConcert.Id"
        >
          <td>{{ artistOnConcert.firstName }}</td>
          <td>{{ artistOnConcert.lastName }}</td>
          <td>{{ artistOnConcert.pseudonym }}</td>
          <td>{{ artistOnConcert.venue }}</td>
          <td v-if="logedIn">
            <ul class="list-actions">
              <li><a class="list-actions-button-details" @click="details(artistOnConcert.id)">{{ $t('details') }}</a></li>
              <li><a class="list-actions-button-edit" @click="edit(artistOnConcert.id)">{{ $t('edit') }}</a></li>
              <li><a class="list-actions-button-delete" @click="del(artistOnConcert.id)">{{ $t('delete') }}</a></li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>{{ $t('emptyList') }}</p>

    <p v-if="logedIn">
      <router-link
          :to="{name: 'artistOnConcertFormEmpty'}"
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
  name: "ArtistOnConcertList",

  data(){
    return{
      artistsOnConcerts: [],
      logedIn: false,
    }
  },
  mounted(){
    this.getArtistOnConcertFromApi()
        .then(apiResponse => {
          this.artistsOnConcerts = this.adaptData(apiResponse.data)
        })
    this.logedIn = this.$checkLogin()
  },
  methods:{
    async getArtistOnConcertFromApi(){
      return axios
          .get('http://localhost:3000/api/artistOnConcert')
          .catch(err => {
            console.log(err)
          })
    },
    adaptData(apiData){
      return apiData.map(performance => {
        return {
          id: performance.Id,
          firstName: performance.artistOnConcert.FirstName,
          lastName: performance.artistOnConcert.LastName,
          pseudonym: performance.artistOnConcert.Pseudonym,
          venue: performance.performedDuring.Venue
        }
      })
    },
    details(id){
      this.$router.push({ name: 'artistOnConcertForm', params: {id: id,mode: 'details'}})
    },
    edit(id){
      this.$router.push({ name: 'artistOnConcertForm', params: {id: id,mode: 'edit'}})
    },
    del(id){
      axios.delete('http://localhost:3000/api/artistOnConcert/' + id)
          .then(() => {
            this.artistsOnConcerts = this.artistsOnConcerts.filter(performance => performance.id != id)
          })
    },
  },
}
</script>

<style scoped>

</style>

<i18n>
{
  "pl": {
    "title": "Lista artystów na koncertach",
    "details": "Szczegóły",
    "edit": "Edytuj",
    "delete": "Usuń",
    "emptyList": "Nie ma nic do wyświetlenia",
    "addNew": "Dodaj nowy występ",
    "name": "Imie",
    "surname": "Nazwisko",
    "pseudonym": "Pseudonim",
    "concert": "Koncert",
    "actions": "Akcje"
  },
  "en": {
    "title": "List of artist on concerts",
    "details": "Details",
    "edit": "Edit",
    "delete": "Delete",
    "emptyList": "No performances to display",
    "addNew": "Add new performance",
    "name": "Name",
    "surname": "Surname",
    "pseudonym": "Pseudonym",
    "concert": "Concert",
    "actions": "Actions"
  }
}
</i18n>