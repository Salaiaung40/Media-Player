<template>
  <div class="frame">
    <h3>{{ msg }}</h3>
    <div class="control">
      <button class="prev" @click="prev">Prev</button>
      <button class="play" v-if="!isPlaying" @click="play">Play</button>
      <button class="pause" v-else @click="pause()">Pause</button>
      <button class="next" @click="next">Next</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "MusicPlayer",
  data() {
    return {
      msg: "My Music App by Salai"
    };
  }
};
</script>


<style scoped>
.frame {
  /*background-color: black;*/
  color: red;
}
</style>