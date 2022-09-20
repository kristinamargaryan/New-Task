<template>
  <div>
    <div class="mine">
      <v-btn
        color="orange"
        class="favBtn"
        rounded
        @click="$router.push(`/favoritePage`)"
      >
        MY Favorite News {{ likedNewsIds.length }}
      </v-btn>

      <v-text-field
        label="SEARCH"
        v-model="search"
        filled
        rounded
        dense
      ></v-text-field>
    </div>
    <div class="cont">
      <div
        v-for="(item, i) in searchResult"
        :key="`item_${i}`"
        class="cont_div"
      >
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="200px"
            lazy-src="https://cdn.vectorstock.com/i/1000x1000/48/06/image-preview-icon-picture-placeholder-vector-31284806.webp"
            :src="item.urlToImage"
          >
          </v-img>
          <v-card-title>{{ item.source.name }}</v-card-title>

          <v-card-subtitle class="pb-0">
            {{ item.publishedAt }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ item.title }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="$router.push(`/news/${i}`)"
              target="_blank"
            >
              LOOK
            </v-btn>
            <v-icon
              :color="likedNewsIds.includes(i) ? 'red' : 'gray'"
              class="like_icon"
              @click="addLike(i)"
              >mdi-heart</v-icon
            >
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      loading: false,
      newsData: [],
      likedNewsIds: [],
      search: "",
    };
  },
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
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
        this.newsData = response.data.articles;
        this.loading = false;
      })
      .catch((e) => {
        console.log("e", e);
        this.loading = false;
      });
    JSON.parse(localStorage.getItem("likedData")).forEach((item) => {
      this.likedNewsIds.push(item.id);
    });
  },
  methods: {
    addLike(index) {
      if (this.likedNewsIds.includes(index)) {
        this.likedNewsIds = this.likedNewsIds.filter((id) => id !== index);
      } else {
        this.likedNewsIds.push(index);
      }
      let data = [];
      this.newsData.forEach((item, i) => {
        if (this.likedNewsIds.includes(i)) {
          data.push({
            id: i,
            data: item,
          });
        }
      });
      localStorage.setItem("likedData", JSON.stringify(data));
    },
  },
  computed: {
    searchResult() {
      if (this.search) {
        return this.newsData.filter((item) =>
          item.source.name.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.newsData;
      }
    },
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
  width: 500px;
  height: 400px;
}
.like_icon {
  cursor: pointer;
}
.mine {
  margin: 10px;
  display: flex;
  align-items: flex-start;
}
.favBtn {
  color: white;
  font-size: 20px;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 36px;
  min-width: 64px;
  padding: 25px 16px;
}
</style>
