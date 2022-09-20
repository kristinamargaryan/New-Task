import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewsPage from "../components/NewsPage.vue";
import FavoritePage from "../components/FavoritePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/news/:id",
    name: "News",
    component: NewsPage,
  },
  {
    path: "/favoritePage",
    name: "Favorit",
    component: FavoritePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
