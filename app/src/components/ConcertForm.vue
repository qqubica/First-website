<template>
  <main>
    <h2>{{ $t('title') }}</h2>
    <v-sheet
        rounded
        max-width="1200"
        color="transparent"
    >
      <v-form ref="concertForm">
        <v-container>
          <v-text-field
              ref="venue"
              v-model="formData.venue"
              :label="$t('venue')"
              :counter="200"
              :rules="venueRules"
              :placeholder="$t('max200')"
              :hint="$t('max200')"
              :disabled="formMode == 'details'"
              :error-messages="venueErrors"
              variant="outlined"
              class="pa-2 input-field"
          ></v-text-field>
          <v-text-field
              ref="startDate"
              v-model="formData.startDate"
              :label="$t('startDate')"
              :rules="startDateRules"
              :disabled="formMode == 'details'"
              :error-messages="startDateErrors"
              variant="outlined"
              type="date"
              class="pa-2 input-field"
          ></v-text-field>
          <v-text-field
              ref="finishDate"
              v-model="formData.finishDate"
              :label="$t('finishDate')"
              :rules="finishDateRules"
              :disabled="formMode == 'details'"
              :error-messages="finishDateErrors"
              variant="outlined"
              type="date"
              class="pa-2 input-field"
          ></v-text-field>
          <div>
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
          
          <div v-if="formMode=='details'">
          <h2>{{ $t('performanceDetails') }}</h2>
            <table class="table-list">
              <thead>
                <tr>
                  <th>{{ $t('name') }}</th>
                  <th>{{ $t('lastName') }}</th>
                  <th>{{ $t('pseudonim') }}</th>
                  <th>{{ $t('performanceId') }}</th>
                  <th>{{ $t('performanceTime') }}</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="performance in performances" :key="performance.id">
                <td>{{ performance.firstName }}</td>
                <td>{{ performance.lastName }}</td>
                <td>{{ performance.pseudonym }}</td>
                <td>{{ performance.performanceNumber }}</td>
                <td>{{ performance.performanceTime }}</td>
  
              </tr>
              </tbody>
            </table>
          </div>
        </v-container>
      </v-form>
    </v-sheet>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "ConcertForm",

  data(){
    return {
      formData: {},
      performances: [],
      venueRules: [
        (v) => v ? true: this.$t('required'),
        (v) => v?.length >= 2 ? true: this.$t('min2'),
        (v) => v?.length <= 200 ? true: this.$t('max200'),
      ],
      startDateRules: [
        (v) => v ? true: this.$t('required'),
      ],
      finishDateRules: [
        (v) => v ? true: this.$t('required'),
      ],
      venueErrors: [],
      startDateErrors: [],
      finishDateErrors: [],
    }
  },
  props:{
    id:{
      type: String,
      required: false,
    },
    mode: {
      type: String,
      require: false,
    },
  },
  mounted(){
    if (this.concertId) {
      this.getConcertFromApi()
          .then(apiResponse => {
            this.formData = this.adaptData(apiResponse.data)
          })
      this.getArtistOnConcertFromApi()
          .then(apiResponse => {
            this.performances = this.adaptPerformances(apiResponse.data)
          })
    }
  },
  methods: {
    async getArtistOnConcertFromApi(){
      return axios
          .get('http://localhost:3000/api/artistOnConcert',{
            headers: {
              Authorization: 'Bearer ' + this.$loginData().token
            }})
          .catch(err => {
            console.log(err)
          })
    },
    adaptPerformances(apiData){
      let data = apiData.filter(p => {
        return p.ConcertId == this.concertId
      }).map(performance => {
        return {
          id: performance.Id,
          firstName: performance.artistOnConcert.FirstName,
          lastName: performance.artistOnConcert.LastName,
          pseudonym: performance.artistOnConcert.Pseudonym,
          performanceNumber: performance.PerformanceNumber,
          performanceTime: performance.PerformanceTime,
        }
      })
      return data
    },
    async getConcertFromApi(){
      return axios
          .get('http://localhost:3000/api/concert/' + this.concertId, {
            headers: {
              Authorization: 'Bearer ' + this.$loginData().token
            }})
          .catch(error => {
            console.log(error)
          })
    },
    adaptData(apiData){
      return {
        id: apiData.Id,
        venue: apiData.Venue,
        startDate: apiData.StartDate.split('T')[0],
        finishDate: apiData.FinishDate.split('T')[0],
      }
    },

    cancelForm(){
      this.$router.push({ path: '/concert' })
    },
    async onSubmit(){
      if (this.formMode == 'details'){
        return this.$router.push({name: 'concertForm', params: {id: this.formData.id, mode: 'edit'}})
      }
      if((await this.$refs.concertForm.validate()).valid){
        this.submitForm();
      }
    },
    submitForm(){
      if (this.formMode == 'add'){
        let data = {
          Venue: this.formData.venue,
          StartDate: this.formData.startDate,
          FinishDate: this.formData.finishDate,
        }
        return axios
            .post('http://localhost:3000/api/concert/',
                data, {
                  headers: {
                    Authorization: 'Bearer ' + this.$loginData().token
                  }})
            .then(() => {
              console.log("ASDASDAS")
              this.$refs.concertForm.reset()
              this.$router.push({path: '/concert'})
            })
            .catch((err) => {
              this.venueErrors = err.response.data.filter(e=>e.path=='venue').map(e=>this.$t(e.message))
              this.startDateErrors = err.response.data.filter(e=>e.path=='startDate').map(e=>this.$t(e.message))
              this.finishDateErrors = err.response.data.filter(e=>e.path=='finishDate').map(e=>this.$t(e.message))
            })
      }
      if (this.formMode == 'edit') {
        let data = {
          Venue: this.formData.venue,
          StartDate: this.formData.startDate,
          FinishDate: this.formData.finishDate,
        }
        return axios
            .put('http://localhost:3000/api/concert/' + this.formData.id,
            data, {
              headers: {
                Authorization: 'Bearer ' + this.$loginData().token
              }})
            .then(() => {
              this.$refs.concertForm.reset()
              this.$router.push({path: '/concert'})
            })
            .catch((err) => {
              this.venueErrors = err.response.data.filter(e=>e.path=='venue').map(e=>this.$t(e.message))
              this.startDateErrors = err.response.data.filter(e=>e.path=='startDate').map(e=>this.$t(e.message))
              this.finishDateErrors = err.response.data.filter(e=>e.path=='finishDate').map(e=>this.$t(e.message))
            })
      }
    },

  },
  computed: {
    concertId(){
      return this.$route.params?.id
    },
    formMode(){
      // return this.$route.params?.mode
      if (this.$route.params.mode){
        return this.$route.params.mode
      }
      return this.$route.fullPath.split('/').pop()
    },
  }
}
</script>

<style scoped>
.input-field{
  color: black;
}
.button-add{
  background-color: #27ae60;
  color: white;
}
.button-add:hover{
  background-color: #2ecc71;
}
.button-cancel{
  background-color: #ee4834;
  color: white;
}
.button-cancel:hover{
  background-color: #e74c3c;
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
    "title": "Dodaj koncer",
    "required": "Pole jest wymagane",
    "max200": "Do 200 znaków",
    "notDate": "To nie jest data",
    "concertList": "Lista koncertów",
    "details": "Szczegóły",
    "edit": "Edytuj",
    "delete": "Usuń",
    "addNew": "Dodaj nowy koncert",
    "concert": "Koncert",
    "cancel": "Anuluj",
    "venue": "Lokalizacja",
    "startDate": "Data początkowa",
    "finishDate": "Data końca",
    "detailsButton": "Edytuj",
    "editButton": "Zapisz zmiany",
    "undefinedButton": "Dodaj",
    "addButton": "Dodaj",
    "name":"Imie",
    "lastName":"Nazwisko",
    "pseudonim":"Pseudonim",
    "performanceId":"Nr występu",
    "performanceTime":"Czas występu",
    "performanceDetails":"Szczegóły występu",
    "min2": "Minimum 2 znaki",
    "Pole jest wymagane": "Pole jest wymagane",
    "Pole nie może mieć od 2 do 200 znaków": "Pole nie może mieć od 2 do 200 znaków",
    "Pole powinno zawierać do 200 znaków": "Pole powinno zawierać do 200 znaków",

    "Pole powinno być datą": "Pole powinno być datą",
  },
  "en": {
    "title": "Add concert",
    "required": "Name is required",
    "max200": "Max 200 characters",
    "notDate": "It's not a date",
    "concertList": "Concert list",
    "details": "Details",
    "edit": "Edit",
    "delete": "Delete",
    "addNew": "Add new concert",
    "concert": "Concert",
    "cancel": "Cancel",
    "venue": "Venue",
    "startDate": "Start date",
    "finishDate": "Finish date",
    "detailsButton": "Edit",
    "editButton": "Save changes",
    "undefinedButton": "Add",
    "addButton": "Add",
    "name":"Name",
    "lastName":"Lastname",
    "pseudonim":"Pseudonym",
    "performanceId":"Performance number",
    "performanceTime":"Performance time",
    "performanceDetails":"Performance details",
    "min2": "At liest 2 characters",
    "Pole jest wymagane": "Required",
    "Pole nie może mieć od 2 do 200 znaków": "Max 200 min 2",
    "Pole powinno zawierać do 200 znaków": "Max 200",
    "Pole powinno być datą": "This should be date type",
  }
}
</i18n>