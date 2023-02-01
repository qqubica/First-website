<template>
  <v-app>
    <v-main>
      <header style="display: flex; justify-content: space-between">
        <h1 class="ma-2 pa-2">{{ $t('title') }}</h1>
        <v-img class="ma-2 pa-2" src="./assets/logo.png" alt="Artysci i koncerty logo" max-height="128" max-width="128" aspect-ratio="1"/>
      </header>
      <nav>
        <ul>
          <li>
            <router-link
              :class="{active: $route.name  == 'home'}"
              to="/"
            >
              {{ $t('mainPage') }}
            </router-link>
          </li>
          <li>
            <router-link
                :class="{active: includesArtist}"
                to="/artist"
            >
              {{$t('artist')}}
            </router-link>
          </li>
          <li>
            <router-link
                :class="{active: includesConcert}"
                to="/concert"
            >
              {{ $t('concert') }}
            </router-link>
          </li>
          <li>
            <router-link
                :class="{active: includesArtistOnConcert}"
                to="/artistOnConcert"
            >
              {{ $t('artistOnConcert') }}
            </router-link>
          </li>
          <li
              @click="changeLanguage('pl')"
              style="padding-left: 10px"
          >
            <a :class="{active: this.$i18n.locale == 'pl'}">PL</a></li>
          <li
              @click="changeLanguage('en')"
              style="padding-right: 10px"
          >
            <a :class="{active: this.$i18n.locale == 'en'}">EN</a>
          </li>
          <li style="padding-left: 10px">

            <router-link
                v-if="!logedIn"
                :class="{active: includesLogin}"
                :to="{name: 'login'}"
            >
              {{ $t('loginPage') }}
            </router-link>
            <a
                v-else
                @click="handleLogout"
            >{{ $t('logout')}}</a>
          </li>
        </ul>
      </nav>
      <router-view v-on:loggedIn="(data) => handleLogin(data)"/>
      <footer>
        Jakub Wudarski, s23291
      </footer>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    logedIn: false
  }),
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
    },
    handleLogin(data){
      localStorage.setItem('user', data)
      this.$router.push({name: 'home'})
      this.logedIn = this.isLogedIn
    },
    handleLogout(){
      localStorage.removeItem('user')
      this.logedIn = false
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    isLogedIn(){
      return localStorage.getItem('user') == null ? false: true
    },
    includesConcert(){
      return this.$route.name?.includes("concert")
    },
    includesArtist(){
      return this.$route.name?.includes("artist") && !this.$route.name?.includes("Concert")
    },
    includesArtistOnConcert(){
      return this.$route.name?.includes("artistOnConcert")
    },
    includesLogin(){
      return this.$route.name?.includes("login")
    },
  },
  created() {
    this.logedIn = this.isLogedIn
  }
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
    "title": "Artysci i koncert",
    "loginPage": "Login",
    "logout": "Wyloguj",
  },
  "en": {
    "title": "Artists and concerts",
    "loginPage": "Login",
    "logout": "Logout"
  }
}
</i18n>