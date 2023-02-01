<template>
  <v-main>
    <h2 style="padding-left: 45px">{{ $t('login') }}</h2>
    <v-form ref="loginForm">
      <v-container>
        <v-text-field
            ref="firstName"
            v-model="formData.firstName"
            :label="$t('name')"
            :counter="50"
            :placeholder="$t('inputName')"
            :rules="firstNameRules"
            :error="alert"
            :error-messages="error"
            variant="outlined"
            class="pa-2 input-field"
            style="padding-right: 100px"
        ></v-text-field>
        <v-text-field
            ref="password"
            v-model="formData.password"
            :label="$t('password')"
            :placeholder="$t('inputPass')"
            :rules="passwordRules"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            :error="alert"
            :error-messages="error"
            variant="outlined"
            class="pa-2 input-field"
            @click:append="showPass = !showPass"
        ></v-text-field>

        <v-btn
            color="green"
            class="ma-2"
            @click="validateSend"
        >{{ $t('login') }}</v-btn>
      </v-container>
    </v-form>
    </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",

  data(){
    return {
      token: {},
      formData: {},
      firstNameRules: [
        (v) => v ? true: this.$t('required'),
      ],
      passwordRules: [
        (v) => v ? true: this.$t('required'),
      ],
      showPass: false,
      alert: false,
      error: []
    }
  },
  methods:{
    validateSend(){
      if (!this.$refs.loginForm.validate()){
        console.log(this.error)
        return
      }
      let data = {
        name: this.formData.firstName,
        password: this.formData.password,
      }
      this.loginCall(data)
    },
    async loginCall(data){
      axios
          .post('http://localhost:3000/api/auth/login', data)
          .then(r => {
            this.$emit('loggedIn', r.data)
          })
          .catch(err => {
            this.alert = true
            this.error.push(this.$t('wrongData'))
            console.log(err)
          })

    },
    async getByName(name){
      axios
          .post('http://localhost:3000/api/auth/login', {name: name, password: '1234'})
          .then(res => this.token = res.data.token)
          .catch(err => this.token = err.response.data)
    },
  },
  computed:{
    errorInLogin(){
      if (!alert){
        console.log(this.$t('wrongData'))
        return this.$t('wrongData')
      }
      console.log("ok")
      return []
    }
  },
}
</script>

<style scoped>

</style>

<i18n>
{
  "pl": {
    "name": "Imie",
    "inputName": "Wprowadź swoje imię",
    "inputPass": "Wprowadź hasło",
    "password": "Hasło",
    "login": "Zaloguj",
    "required": "Pole wymagane",
    "wrongData": "Nieprawidłowe dane logowania"
  },
  "en": {
    "name": "Name",
    "inputName": "Input your name",
    "inputPass": "Input password",
    "password": "Password",
    "login": "Login",
    "required": "It's required",
    "wrongData": "Incorrect login data"
  }
}
</i18n>