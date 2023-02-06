<template>
  <section class="section-home home">
    <div class="home__body">
      <CardComponent v-for="game in _gameList" :key="game.id" :game="game"/>
    </div>
    <div class="home__footer">
      <button class="button button-default"
              :class="[this.page < 2 && 'button-disabled']"
              @click="pagePrev"
      >
        Назад
      </button>
      <button class="button button-default"
              :class="[this.gameList.length < this.pageEnd && 'button-disabled']"
              @click="pageNext"
      >
        Вперед
      </button>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from "axios";
import CardComponent from "@/components/cardComponent";

export default {
  name: 'HomeView',
  components: {
    CardComponent
  },
  data(){
    return{
      balances: [],
      gameList: [],
      page: 1,
      errors: [],
    }
  },
  computed:{
    ...mapGetters([
        "getToken",
    ]),
    pageStart(){
      return (this.page - 1) *  8
    },
    pageEnd(){
      return this.page * 8
    },
    _gameList(){
      return this.gameList.slice(this.pageStart, this.pageEnd)
    }
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
            errors = errors?.response?.data?.errors
            this.errors = errors
          })
    },
    getListGame(){
      axios.get('https://poker.evenbetpoker.com/api/web/v2/casino/games', {
        params: {
          clientId: "default",
        }
      }).then(resp =>{
        this.gameList = resp.data.data.map((game) => {
          return {...game.attributes, id: game.id, type: game.type}
        })
      })
          .catch(errors => {
           console.log('getListGame errors', errors )
          })
    },
    pagePrev(){
      if(this.page < 2) return
      this.page--
    },
    pageNext(){
      if(this.gameList.length < this.pageEnd) return
      this.page++
    }
  },
  mounted() {
    this.getListGame()
    // this.getBalanceUser()
    // setInterval(this.getBalanceUser, 30000)
  }
}
</script>
