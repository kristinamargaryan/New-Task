<template>
  <v-app>
    <v-app-bar app color="purple" dark>
      <div @click="$router.push('/')" class="home_btn">
        <v-icon large color="width"> mdi-android </v-icon>
        <div>NEWS WEB</div>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.home_btn {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
