<template>
  <v-btn
      @click="getByName('Kuba')"
  >login</v-btn>
  <div>
    {{ token }}
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",

  data(){
    return {
      token: {}
    }
  },
  methods:{
    async getByName(name){
      axios
          .post('http://localhost:3000/api/auth/login', {name: name, password: '1234'})
          .then(res => this.token = res.data.token)
          .catch(err => this.token = err.response.data)
    }
  }
}
</script>

<style scoped>

</style>