<template>
  <div class="card" @click="gelLinksGames(game.id)">
    <div class="card__body">
      <img class="card__img" :src="game.image || require('@/assets/no-image.jpg')" alt="">
    </div>
    <div class="card__footer">
      {{ game.title }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "cardComponent",
  props:{
    game: Object,
  },
  methods:{
    gelLinksGames(gameId){
      axios.post('https://poker.evenbetpoker.com/api/web/v2/casino/games/'+gameId+'/session-demo', {
        params: {
          clientId: "default",
        }
      }).then(resp =>{
        let link = resp?.data?.data[0].attributes["launch-options"]["game-url"]
        location.href = link
      })
      .catch(errors => {
        let data = errors?.response?.data?.errors || []
        data.forEach(er => {
          this.$toast.error(er.detail);
        })
        console.log('gelLinksGames errors', errors)
      })
    }
  }
}
</script>

<style scoped>

</style>