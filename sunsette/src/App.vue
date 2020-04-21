<template>
  <v-app>
    <Toolbar />
    <v-content class="home">
      <v-snackbar
        v-model="getSnackBar"
        :color="getSnackBarColor"
        :timeout="3000"
        :bottom="getSnackBarOrientation == 'bottom'"
        :top="getSnackBarOrientation == 'top'"
      >
        {{ getSnackBarText }}
        <v-btn dark text @click="hideSnackBarAction">Close</v-btn>
      </v-snackbar>
      <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Footer from "@/components/Footer.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Toolbar,
    Footer, 
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters({
      getSnackBar: "snackbar/getSnackBar",
      getSnackBarColor: "snackbar/getSnackBarColor",
      getSnackBarText: "snackbar/getSnackBarText",
      getSnackBarOrientation : "snackbar/getSnackBarOrientation"
    })
  },

  methods: {
    ...mapActions({
      hideSnackBarAction: "snackbar/hide"
    })
  }
};
</script>

<style>
div .v-slide-group__content v-tabs-bar__content {
  background-color: #F8F9FB !important;
}
</style>
