<template>
  <section class="section-main"
           :class="[getToken && 'section-auth', isMobile && 'mobile-version']"
           v-show="isProgress"
  >
    <section class="section-aside" v-if="getToken">
      <AsideComponent/>
      <button class="button button-default" @click="setTokens(null)">Log out</button>
    </section>
    <main style="padding: 30px">
      <router-view/>
    </main>
  </section>
  <div class="loading" v-if="!isProgress">Loading...</div>
</template>
<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
import axios from "axios";
import AsideComponent from "@/components/asideComponent";
export default {
  name: "app",
  components: {
    AsideComponent
  },
  data(){
    return{
      width: 0,
      isFirstLoad: true,
    }
  },
  computed:{
    ...mapGetters([
        "getToken",
        "getRefreshToken",
        "getIsMobile",
        "isProgress",
    ]),
    isMobile(){
      return this.width < 500
    },
    token(){
      return this.getToken
    }
  },
  watch:{
    token:{
      handler: function (nVal, oldVal){
        if(nVal != oldVal){
          if(nVal){
            this.$router.push({name: 'Home'})
          } else {
            this.$router.push({name: 'Login'})
          }
        }
      },
      deep: true,
      immediate: true
    },
  },
  methods:{
    ...mapActions([
        "setToken",
        "setTokens",
        "setUserId",
    ]),
    ...mapMutations([
        "setIsMobile",
        "setInprogress"
    ]),
    updateToken(){
      if(this.isFirstLoad) this.setInprogress(false)
      axios.post('https://poker.evenbetpoker.com/api/web/auth/token', {
        clientId: "default",
        refreshToken: this.getRefreshToken
      })
          .then(resp =>{
            let data = resp.data
            this.setUserId(data.id)
            this.setTokens({
              token: data.token,
              refresh_token: data["refresh-token"],
            })
            this.setInprogress(true)
          })
          .catch(errors => {
            this.setTokens({
              token: '',
              refresh_token:'',
            })
            console.warn('errors',errors)
            this.setInprogress(true)
          })
    }
  },
  created() {
    this.width = window.innerWidth
  },
  mounted() {
    window.addEventListener('resize', () => this.width = window.innerWidth, true)
    this.updateToken()
    setInterval(this.updateToken, 80000)
  }
}
</script>

<style lang="scss">
@import './styles/scss/main.scss';
.loading{
  background: #21232e;
  height: 100vh;
  font-size: 32px;
  color: wheat;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
