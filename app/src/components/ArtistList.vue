<template>
  <main>
    <h2>{{ $t('artistList') }}</h2>
    <table
        v-if="artists.length > 0"
        class="table-list"
    >
      <thead>
        <tr>
          <th>{{ $t('name') }}</th>
          <th>{{ $t('surname') }}</th>
          <th>{{ $t('pseudonym') }}</th>
          <th>{{ $t('birthdate') }}</th>
          <th v-if="logedIn">{{ $t('actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="artist in artists"
            :key="artist.Id"
        >
          <td>{{ artist.firstName }}</td>
          <td>{{ artist.lastName }}</td>
          <td>{{ artist.pseudonym }}</td>
          <td>{{ artist.birthdate }}</td>
          <td v-if="logedIn">
            <ul class="list-actions">
              <li><a class="list-actions-button-details" @click="details(artist.id)">{{ $t('details') }}</a></li>
              <li><a class="list-actions-button-edit" @click="edit(artist.id)">{{ $t('edit') }}</a></li>
              <li><a class="list-actions-button-delete" @click="del(artist.id)">{{ $t('delete') }}</a></li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>{{ $t('emptyList') }}</p>

    <p>
      <router-link
          :to="{name: 'artistFormEmpty'}"
          class="button-add"
      >
        {{ $t('addNewArtist') }}
      </router-link>
    </p>
  </main>
</template>

<script>

import axios from "axios";

export default {
  name: "ArtistList",

  data() {
    return{
      artists:[],
      logedIn: false,
    }
  },
  mounted() {
    this.getArtistsFromApi()
        .then(apiResponse => {
          this.artists = this.adaptData(apiResponse.data)
        });
    this.logedIn = this.$checkLogin()
  },

  methods: {
    async getArtistsFromApi(){
      return axios
          .get('http://localhost:3000/api/artist')
          .then(data => {
            return data
          })
          .catch(error => {
            console.log(error);
          })
    },
    adaptData(apiData){
      return apiData.map(artist => {
        return {
          id: artist.Id,
          firstName: artist.FirstName,
          lastName: artist.LastName,
          pseudonym: artist.Pseudonym,
          birthdate: artist.Birthdate?.split('T')[0]
        }
      })
    },
    details(id){
      this.$router.push({ name: 'artistForm', params: {id: id,mode: 'details'}})
    },
    edit(id){
      this.$router.push({ name: 'artistForm', params: {id: id,mode: 'edit'}})
    },
    del(id){
      axios
          .delete('http://localhost:3000/api/artist/' + id)
          .then(() => {
              this.artists = this.artists.filter(artist => artist.id != id)
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
    "artistList": "Lista artystów",
    "addNewArtist": "Dodaj nowego artystę",
    "details": "Szczegóły",
    "edit": "Edytuj",
    "delete": "Usuń",
    "emptyList": "Nie ma nic do wyświetlenia",
    "addNew": "Dodaj nowy występ",
    "name": "Imie",
    "surname": "Nazwisko",
    "pseudonym": "Pseudonim",
    "birthdate": "Data urodzenia",
    "concert": "Koncert",
    "actions": "Akcje"
  },
  "en": {
    "title": "List of artist on concerts",
    "artistList": "Artist list",
    "addNewArtist": "Add new artist",
    "details": "Details",
    "edit": "Edit",
    "delete": "Delete",
    "emptyList": "No performances to display",
    "addNew": "Add new performance",
    "name": "Name",
    "surname": "Surname",
    "pseudonym": "Pseudonym",
    "birthdate": "Birth date",
    "concert": "Concert",
    "actions": "Actions"
  }
}
</i18n>