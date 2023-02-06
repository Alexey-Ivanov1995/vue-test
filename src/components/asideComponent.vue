<template>
    <aside class="aside">
      <div class="aside__user">
        <div class="aside__user__photo">
          <img class="aside__user__img" src="../assets/user.png" alt="user">
        </div>
        <h1 class="aside__user__title">
         user ID {{ getUserId }}
        </h1>
      </div>
      <div class="aside__body">
        <ul class="aside__info-list">
          <li class="aside__info-item" v-for="(balance, i) in balances" :key="i">
            <div class="aside__info-currency">
              {{ balance.currency }}
            </div>
            <div class="aside__info-value">
              {{ balance.available }}
            </div>
          </li>
        </ul>
      </div>
    </aside>
</template>

<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "asideSection",
  data(){
    return{
      balances:[],
    }
  },
  computed:{
    ...mapGetters([
      "getToken",
      "getUserId"
    ]),
  },
  methods:{
    ...mapActions([
      "setTokens"
    ]),
    getBalanceUser(){
      axios.get('https://poker.evenbetpoker.com/api/web/v2/users/me/balance', {
        params: {
          clientId: "default",
          auth: this.getToken
        }
      }).then(resp =>{
        this.balances = resp.data.data.map(balance => balance.attributes)
      })
     .catch(errors => {
       console.warn(errors)
     })
    },
  },
  mounted() {
    this.getBalanceUser()
    setInterval(this.getBalanceUser, 30000)
  }
}
</script>

<style scoped>

</style>