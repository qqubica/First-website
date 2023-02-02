<template>
  <main>
    <h2>{{ $t('title') }}</h2>
    <v-sheet
        rounded
        max-width="1200"
        color="transparent"
    >
      <v-form ref="artistForm">
        <v-container>
          <v-text-field
              ref="firstName"
              v-model="formData.firstName"
              :label="$t('name')"
              :counter="50"
              :rules="nameRules"
              :placeholder="$t('min2max50')"
              :hint="$t('min2max50')"
              :disabled="formMode == 'details'"
              variant="outlined"
              clearable
              class="pa-2 input-field"
          ></v-text-field>
          <v-text-field
              v-if="formMode=='add'"
              ref="password"
              v-model="formData.password"
              :rules="passwordRules"
              :label="$t('password')"
              :placeholder="$t('inputPass')"
              variant="outlined"
              class="pa-2 input-field"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
          ></v-text-field>
          <v-text-field
              ref="lastName"
              v-model="formData.lastName"
              :label="$t('surname')"
              :counter="100"
              :rules="lastNameRules"
              :placeholder="$t('min2max100')"
              :hint="$t('min2max100')"
              :disabled="formMode == 'details'"
              variant="outlined"
              clearable
              class="pa-2 input-field"
          ></v-text-field>
          <v-text-field
              ref="pseudonym"
              v-model="formData.pseudonym"
              :label="$t('pseudonym')"
              :counter="200"
              :rules="psudonymRules"
              :placeholder="$t('max200')"
              :hint="$t('max200')"
              :disabled="formMode == 'details'"
              variant="outlined"
              clearable
              class="pa-2 input-field"
          ></v-text-field>
          <v-text-field
              ref="birthdate"
              v-model="formData.birthdate"
              :label="$t('birthdate')"
              :rules="dateRules"
              :disabled="formMode == 'details'"
              variant="outlined"
              type="date"
              class="pa-2 input-field"
          ></v-text-field>
          <div >
            <v-btn
                :class="'ma-2 '+ formMode == 'details' ? 'button-edit': 'button-add'"
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

const axios = require('axios');

export default {
  name: "ArtistForm",

  data(){
    return {
      formData: {},
      nameRules: [
        (v) => v ? true: this.$t('required'),
        (v) => v?.length >= 2 ? true: this.$t('min2'),
        (v) => v?.length <= 50 ? true: this.$t('max50'),
      ],
      lastNameRules: [
        (v) => v ? true: this.$t('required'),
        (v) => v?.length >= 2 ? true: this.$t('min2'),
        (v) => v?.length <= 50 ? true: this.$t('max100'),
      ],
      psudonymRules: [
        (v) => {
          if (v?.length === undefined){
            return true;
          }
          return v?.length <= 200 ? true: this.$t('max200')
        },
      ],
      passwordRules: [
        (v) => v ? true: this.$t('required'),
      ],
      dateRules: [],
      showPass: false
    }
  },
  props:{
    id: {
      type: String,
      required: false,
    },
    mode: {
      type: String,
      require: false,
    }
  },
  mounted() {
    if (this.artistId) {
      this.getArtistFromApi()
          .then(apiResponse => {
            this.formData = this.adapdData(apiResponse.data)
          })
    }
  },
  methods: {
    async getArtistFromApi(){
      return axios
          .get('http://localhost:3000/api/artist/' + this.artistId)
          .catch(error => {
            console.log(error);
          })
    },
    adapdData(apiData){
      return {
        id: apiData.Id,
        firstName: apiData.FirstName,
        lastName: apiData.LastName,
        pseudonym: apiData.Pseudonym,
        birthdate: apiData.Birthdate?.split('T')[0]
      }
    },
    cancelForm(){
      this.$router.push({ path: '/artist' })
    },
    async onSubmit(){
      if (this.formMode == 'details'){
        return this.$router.push({name: 'artistForm', params: {id: this.formData.id, mode: 'edit'}})
      }
      if((await this.$refs.artistForm.validate()).valid){
        this.submitForm()
      }
    },
    submitForm(){
      if (this.formMode == 'add'){
        let data = {
          FirstName: this.formData.firstName,
          LastName: this.formData.lastName,
          Pseudonym: this.formData.pseudonym,
          Birthdate: this.formData.birthdate,
          password: this.formData.password,
        }
        return axios
            .post('http://localhost:3000/api/artist/',data)
            .then(() => {
              this.$refs.artistForm.reset()
              this.$router.push({path: '/artist'})
            })
            .catch((err) => {
              console.log(err)
            })
      }
      if (this.formMode == 'edit') {
        let data = {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          pseudonym: this.formData.pseudonym,
          birthdate: this.formData.birthdate
        }
        return axios({
          methods: 'PUT',
          url: 'http://localhost:3000/api/artist/' + this.formData.id,
          headers: {
            'Authorization': 'Bearer ' + this.$loginData.token
          },
          data: data
        })
            .then(() => {
              this.$refs.artistForm.reset()
              this.$router.push({path: '/artist'})
            })
            .catch((err) => {
              console.log(err)
            })
      }
      console.log(this.formMode)
    }
  },
  computed: {
    artistId(){
      return this.$route.params?.id
    },
    formMode(){
      if (this.$route.params.mode){
        return this.$route.params.mode
      }
      return this.$route.fullPath.split('/').pop()
    },
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
    "title": "Dodaj artystę",
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
    "addNew": "Dodaj nowego artystę",
    "name": "Imie",
    "surname": "Nazwisko",
    "pseudonym": "Pseudonim",
    "birthdate": "Data urodzenia",
    "concert": "Koncert",
    "actions": "Akcje",
    "cancel": "Anuluj",
    "detailsButton" : "Edytuj",
    "editButton": "Zapisz zmiany",
    "undefinedButton": "Dodaj",
    "addButton": "Dodaj",
    "password": "Hasło",
    "inputPass": "Wpisz hasło",

  },
  "en": {
    "title": "Add artist",
    "required": "Name is required",
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
    "addNew": "Add new artist",
    "name": "Name",
    "surname": "Surname",
    "pseudonym": "Pseudonym",
    "birthdate": "Birth date",
    "concert": "Concert",
    "actions": "Actions",
    "cancel": "Cancel",
    "detailsButton": "Edit",
    "editButton": "Save changes",
    "undefinedButton": "Add",
    "addButton": "Add",
    "password": "Password",
    "inputPass": "Input password"
  }
}
</i18n>