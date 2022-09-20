<template>
  <div class="conteiner">
    <v-card
      v-for="(item, i) in favoriteNews"
      :key="`item__${i}`"
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="item.data.urlToImage"
      >
        <v-card-title>{{ item.data.source.name }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0"
        >{{ item.data.publishedAt }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ item.data.title }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text target="_blank" :href="item.data.url">
          READ MORE
        </v-btn>
        <v-btn color="orange" @click="$router.push(`/news/${i}`)" text>
          LOOK
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoriteNews: [],
    };
  },
  mounted() {
    this.favoriteNews = JSON.parse(localStorage.getItem("likedData"));
  },
};
</script>

<style scoped lang="scss">
.conteiner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.mx-auto {
  margin: 10px;
}
</style>
