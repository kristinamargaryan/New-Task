<template>
  <div class="cont_div">
    <v-card class="mx-auto">
      <v-img
        class="white--text align-end"
        height="500px"
        lazy-src="https://cdn.vectorstock.com/i/1000x1000/48/06/image-preview-icon-picture-placeholder-vector-31284806.webp"
        :src="news.urlToImage"
      >
      </v-img>
      <v-card-title>{{ news.source.name }}</v-card-title>

      <v-card-subtitle class="pb-0"> {{ news.publishedAt }} </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ news.content }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text target="_blank" @click="$router.push('/')">
          GO HOME
        </v-btn>
        <v-btn color="orange" text target="_blank" :href="news.url">
          READ MORE
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    sticky: false,
    loading: false,
    news: {},
  }),
  mounted() {
    this.loading = true;
    axios
      .get(
        "https://newsapi.org/v2/everything?q=apple&from=2022-09-12&to=2022-09-12&sortBy=popularity&apiKey=8102204817004d049b3183a72882579f",
        {
          id: "the-verge",
        }
      )
      .then((response) => {
        this.news = response.data.articles[this.$route.params.id];
        this.loading = false;
      })
      .catch((e) => {
        console.log("e", e);
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.cont_div {
  margin: 10px;
}
.mx-auto {
  width: 1000px;
  height: 100%;
}
.like_icon {
  cursor: pointer;
}
</style>
