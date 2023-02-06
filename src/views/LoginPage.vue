<template>
  <section class="login">
    <form class="login__form" @submit.prevent="login">
      <ul class="login__form-list">
        <li class="login__form-item">
          <label class="login__form-item-label">
            <span class="login__form-item-title">Login:</span>
            <div class="login__form-item-input">
              <input type="text" v-model="form.login">
            </div>
          </label>
        </li>
        <li class="login__form-item">
          <label class="login__form-item-label">
            <span class="login__form-item-title">Password:</span>
            <div class="login__form-item-input">
              <input type="text" v-model="form.password">
            </div>
          </label>
        </li>
      </ul>
      <button class="button button-default">
        login
      </button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import {mapActions, mapMutations} from 'vuex'

export default {
  name: "LoginPage",
  data(){
    return{
      form: {
        login: '',//'richard',
        password: '',//'poker',
      },
      errors: []
    }
  },
  methods:{
    ...mapActions([
        "setTokens",
        "setUserId"
    ]),
    ...mapMutations([
        "setInprogress"
    ]),
    login(){
      this.setInprogress(false)
      axios.post('https://poker.evenbetpoker.com/api/web/v2/login', {
        clientId: "default",
        login: this.form.login,
        password: this.form.password,
      })
      .then(resp =>{
        let data = resp.data?.data[0]
        this.setUserId(data.id)
        let attributes = data?.attributes
        let tokens = {
          token: attributes.token,
          refresh_token: attributes["refresh-token"],
        }
        this.setTokens(tokens)
        this.setInprogress(true)
      })
      .catch(errors => {
        this.setInprogress(true)
        errors = errors?.response?.data?.errors || []
        errors.filter(e => e.source.pointer == '/data/attributes/login').map(e => e.detail).forEach(er => this.$toast.error(er))
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>