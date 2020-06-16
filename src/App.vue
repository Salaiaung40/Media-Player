<template>
  <div id="app">
    <h3>{{ msg }}</h3>
    <div class="box1">
      <div class="picture">
        <!--<div class="player-cover"> -->
        <transition-group :name="transitionName">
          <div
            class="player-cover__item"
            v-for="(track, $index) in tracks"
            :key="$index"
            v-if="$index === currentTrackIndex"
            :style="{ backgroundImage: `url(${track.cover})` }"
          ></div>
        </transition-group>
      </div>

      <!--end of .picture-->

      <div class="player">
        <div class="progress" ref="progress">
          <div class="progress__top">
            <div class="album-info" v-if="currentTrack">
              <div class="album-info__name">{{ currentTrack.name }} by {{ currentTrack.artist }}</div>
            </div>

            <div class="progress__duration">{{ duration }}</div>
          </div>

          <div class="progress__bar" @click="clickProgress">
            <div class="progress__current" :style="{ width: barWidth }"></div>
          </div>

          <div class="progress__time">{{ currentTime }}</div>
        </div>
        <!--end of progress-->

        <div class="player-controls">
          <div class="player-controls__item" @click="prevTrack">
            <i
              class="far fa-arrow-alt-circle-left"
              style="font-size: 35px;color: #333333;z-index: 1"
            ></i>
          </div>

          <div class="player-controls__item -xl js-play" @click="play">
            <i
              class="icon, fas fa-play"
              style="font-size:25px;color:red;z-index:1"
              v-if="isTimerPlaying"
            ></i>
            <i class="icon, fas fa-pause" style="font-size:25px;color:#333333;z-index:1" v-else></i>
          </div>

          <div class="player-controls__item" @click="nextTrack">
            <i
              class="icon, far fa-arrow-alt-circle-right"
              style="font-size: 35px;color: #333333;z-index: 1"
            ></i>
          </div>

          <div>
            <button class="show-list" v-on:click="list = !list">Play Lists</button>
          </div>
        </div>
        <!--end of .player-controls-->

        <div v-cloak></div>
      </div>
      <!--end of .player-->
    </div>
    <!--end of box1-->
    <div class="box2">
      <button class="container" v-if="list" v-for="(track, index) in tracks" :key="index">
        {{ track.name }} by {{ track.artist }}
        <br />
      </button>
      <!--@click="play(song); togglePlay(index)"
      :class="track.src == current.src ? 'track playing' : 'track'"-->
    </div>
    <!--end of box2-->
  </div>
  <!--end of #app-->
</template>

<script>
/*
new Vue({
  el: "#app",
 
  data() {
    return {
      
    };
  }
}; */

export default {
  name: "App",
  data() {
    return {
      msg: "Musicplayer App by Salai",
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      list: false,
      tracks: [
        {
          name: "Papaoutai",
          artist: "Stromae",
          cover: require("./assets/img/Papaoutai.jpg"),
          source: require("./assets/mp3/Stromae-Papaoutai.mp3")
        },
        {
          name: "Grateful",
          artist: "Neffex",
          cover: require("./assets/img/mado.jpg"),
          source: require("./assets/mp3/neffex-grateful.mp3")
        },

        {
          name: "Hotel California",
          artist: "The Best of te Eagles",
          cover: require("./assets/img/TVBOE.jpg"),
          source: require("./assets/mp3/03. Hotel California.mp3")
        },
        {
          name: "Nessun Dorma",
          artist: "Luciano Pavarotti",
          cover: require("./assets/img/Luciano.jpg"),
          source: require("./assets/mp3/Luciano Pavarotti - Nessun dorma.mp3")
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement("link");
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image";
      document.head.appendChild(link);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background-color: #dcdcdc;
  text-align: center;
  color: #333;
  margin-top: 40px;
  width: 50%;
  height: auto;
  margin-left: 25%;
  border-radius: 1.5em;

  box-shadow: 7px 12px 15px 0px #a9a9a9; */
}

h3,
.box1,
.box2 {
  background-color: #dcdcdc;
  text-align: center;
  color: #333;
  margin-top: 10px;
  border-radius: 1.5em;
  box-shadow: 7px 12px 15px 0px #a9a9a9;
  margin-left: 25%;
}
.box1 {
  width: 50%;
  height: 550px;
}

h3 {
  color: black;
  font-weight: 700;
  width: 50%;
}
.box2 {
  width: 50%;
  height: auto;
  opacity: 1;
}
.container {
  display: flex;
  width: 90%;
  height: auto;
  text-align: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 1.5em;
  margin-left: 5%;
  font-weight: 600;
}
.music-list {
  width: 80%;
  height: auto;
  margin-left: 10%;
  border-radius: 1.5em;
  box-shadow: 7px 12px 15px 0px #a9a9a9;
  align-items: center;
}
.box2 .track {
  display: block;
  width: 100%;
  padding: 1em;
  font-size: 1em;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: center;
  /*word-spacing: 0em; */
}
.box2 .track {
  color: #ff5858;
}
/*.player {
  width: 80%;
  height: 20%;
  margin-left: 10%;
  border-radius: 1.5em;
  box-shadow: 7px 12px 15px 0px black; /*#a9a9a9;
}

/*body {
  background: #dfe7ef;
  font-family: "Bitter", serif;
}

* {
  box-sizing: border-box;
}*/

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  z-index: 2;
  font-size: 3em;
}
/*
.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-size: cover;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .wrapper {
    flex-wrap: wrap;
    flex-direction: column;
  }
}
*/
.player {
  background: #eef3f7;
  width: 80%;
  height: 30%;
  box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
  margin-top: 30px;
  margin-left: 10%;
  border-radius: 15px;
  padding: 1em;
  position: relative;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player {
    width: 95%;
    padding: 1em;
    margin-top: 55px;
    min-height: initial;
    padding-bottom: 30px;
    max-width: 400px;
    position: relative;
  }
}
.player__top {
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 4;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player__top {
    flex-wrap: wrap;
  }
}

.picture {
  width: 90%;
  height: 55%;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  border-radius: 15px;
  z-index: 1;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .picture {
    margin-bottom: 25px;
    width: 290px;
    height: 230px;
    margin-left: auto;
    margin-right: auto;
  }
}
.player-cover__item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  background-color: black;
  width: 95%;
  height: 100%;
  margin-top: 10px;
  margin-left: 10%;
  border-radius: 15px;
  position: absolute;
  left: 0;
  top: 0;
}
.player-cover__item:before {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  display: block;
  z-index: 1;
  position: absolute;
  top: 30px;
  transform: scale(0.9);
  filter: blur(10px);
  opacity: 0.9;
  border-radius: 15px;
}
.player-cover__item:after {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  display: block;
  z-index: 2;
  position: absolute;
  border-radius: 15px;
}
.player-cover__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  user-select: none;
  pointer-events: none;
}
.player-controls {
  flex: 1;
  display: flex;
  flex-direction: row;
  /*flex-direction: column;*/
  align-items: center;
  position: relative;
  justify-items: center;
  justify-content: center;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls {
    flex-direction: row;
    padding-left: 0;
    width: 100%;
    flex: unset;
  }
}
.show-list {
  color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 14px;
  padding: 5px;
  border-radius: 12px;
  margin-left: 1em;
  font-family: Georgia, serif;
  font-weight: normal;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  background-image: linear-gradient(
    to right,
    rgb(28, 110, 164) 0%,
    rgb(35, 136, 203) 50%,
    rgb(20, 78, 117) 100%
  );
  box-shadow: rgb(0, 0, 0) 5px 5px 15px 5px;
  border: 2px solid rgb(28, 110, 164);
  display: inline-block;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .show-list {
    margin-left: 35px;
  }
}

.myButton:hover {
  background: #1c6ea4;
}
.myButton:active {
  background: #144e75;
}
.player-controls__item {
  display: inline-flex;
  font-size: 3em;
  padding: 25px;
  margin-bottom: 2px;
  color: red;
  /*color: #acb8cc;
   margin-left: 0.8em;*/
  cursor: pointer;
  width: 0.5em;
  height: 0.5em;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease-in-out;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item {
    font-size: 3em;
    padding: 5px;
    margin-right: 10px;
    color: Blue;
    /*color: #acb8cc;*/
    cursor: pointer;
    width: 1em;
    height: 1em;
    margin-bottom: 0;
  }
}
.player-controls__item::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgb(15, 218, 15);

  transform: scale(0.5);
  opacity: 1;
  box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
  transition: all 0.3s ease-in-out;
  transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
}
@media screen and (min-width: 500px) {
  .player-controls__item:hover {
    color: #532ab9;
  }
  .player-controls__item:hover::before {
    opacity: 1;
    transform: scale(1.3);
  }
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item:active {
    color: #532ab9;
  }
  .player-controls__item:active::before {
    opacity: 1;
    transform: scale(1.3);
  }
}
.player-controls__item .icon {
  position: relative;
  z-index: 2;
}
.player-controls__item.-xl {
  margin-bottom: 0;
  font-size: 5em;
  filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
  color: red;
  /*color: #fff;*/
  width: auto;
  height: auto;
  display: inline-flex;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item.-xl {
    font-size: 3em;
    margin-right: 0;
  }
}
.player-controls__item.-xl:before {
  opacity: 1;
  /*display: none;*/
}
.player-controls__item.-favorite.active {
  color: red;
}

[v-cloak] {
  display: none;
}

[v-cloak] > * {
  display: none;
}

.progress {
  width: 100%;
  margin-top: -15px;
  user-select: none;
}
.progress__top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.progress__duration {
  color: #71829e;
  font-weight: 700;
  font-size: 20px;
  opacity: 0.5;
}
.progress__time {
  margin-top: 2px;
  color: #71829e;
  font-weight: 700;
  font-size: 16px;
  opacity: 0.7;
}

.progress__bar {
  height: 6px;
  width: 100%;
  cursor: pointer;
  background-color: #d0d8e6;
  display: inline-block;
  border-radius: 10px;
}

.progress__current {
  height: inherit;
  width: 0%;
  background-color: blue;
  border-radius: 10px;
}

.album-info {
  color: #333333;
  flex: 1;
  padding: 1.5em 1em;
  user-select: none;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .album-info {
    padding-right: 30px;
  }
}
.album-info__name {
  font-size: auto;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1em;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .album-info__name {
    font-size: 18px;
    margin-bottom: 9px;
  }
}

.scale-out-enter-active {
  transition: all 0.35s ease-in-out;
}

.scale-out-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-out-enter {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}

.scale-out-leave-to {
  transform: scale(-1);
  pointer-events: none;
  opacity: 0;
}

.scale-in-enter-active {
  transition: all 0.35s ease-in-out;
}

.scale-in-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-in-enter {
  transform: scale(0.5);
  pointer-events: none;
  opacity: 0;
}

.scale-in-leave-to {
  transform: scale(0.2);
  pointer-events: none;
  opacity: 0;
}

/*# sourceMappingURL=main.css.map */
</style>
