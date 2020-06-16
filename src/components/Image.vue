<template>
  <div class="Image">
    <!-- <img class="photo" v:bine:src="./assets/mado.jpg" /></div>
<h6>{{gretting}}</h6>
    <section>{{song.img}}</section>
    -->
    <h6>{{gretting}}</h6>
    <div>
      <!-- <p class="photo">{{list.img}}</p> -->
      <samp>
        <h6>{{lists.title}} - {{lists.artist}}</h6>
      </samp>
    </div>
  </div>
</template>


<script>
export default {
  name: "app-images",
  data() {
    return {
      current: {},
      gretting: "This is the Image place",
      lists: [
        {
          title: "A Little Prayer",
          artist: "Aretha Franklin"
          // img: require("./assets/prayer.jpg")
        }
      ]
      //img: (img.src = "@/assets/logo.png")};
      /*
      songs: [
        {
          title: "A Little Prayer",
          artist: "Aretha Franklin",
          src: "./assets/prayer.mp3",
          img: "./assets/prayer.jpg"
        }
      ]
      
        {
          title: "Grateful",
          artist: "Neffex",
          src: require("./assets/neffex-grateful.mp3"),
          img: require("./assets/mado.jpg")
        },
        {
          title: "Invincible",
          artist: "Deaf Kev",
          src: require("./assets/deaf-kev-invincible.mp3")
        },
        {
          title: "One of these Night",
          artist: "The Best of te Eagles",
          src: require("./assets/01. One Of These Nights.mp3"),
          img: require("./assets/TVBOE.jpg")
        },
        {
          title: "Take it Easy",
          artist: "The Best of te Eagles",
          src: require("./assets/02. Take It Easy.mp3"),
          img: require("./assets/TVBOE.jpg")
        },
        {
          title: "Hotel California",
          artist: "The Best of te Eagles",
          src: require("./assets/03. Hotel California.mp3"),
          img: require("./assets/TVBOE.jpg")
        },
        {
          title: "New Kid in Town",
          artist: "The Best of te Eagles",
          src: require("./assets/04. New Kid In Town.mp3"),
          img: require("./assets/TVBOE.jpg")
        },
        {
          title: "Heartache Tonight",
          artist: "The Best of te Eagles",
          src: require("./assets/05. Heartache Tonight.mp3"),
          img: require("./assets/TVBOE.jpg")
        },
        {
          title: "Tequila Sunrise",
          artist: "The Best of te Eagles",
          src: require("./assets/06. Tequila Sunrise.mp3"),
          img: require("./assets/TVBOE.jpg")
        },
        {
          title: "Tequila Sunrise",
          artist: "The Best of te Eagles",
          src: require("./assets/06. Tequila Sunrise.mp3"),
          img: require("./assets/TVBOE.jpg")
        }
      ]*/
    };
  },
  created() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  }
};
</script>


<style scoped>
.photo {
  width: 13.5em;
  height: auto;
  align-self: center;
  padding: 0em;
  border-radius: 1em;
  position: relative;
}
</style> 