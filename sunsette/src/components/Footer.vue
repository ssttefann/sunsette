<template>
  <v-footer app absolute class="home">
    <v-row align="center" justify="center">
    <v-col sm="12" lg="12" class="justify-center mx-5">
      <v-divider></v-divider>
      <p class="link pt-2 mb-0">
      Copyright ©
      {{ new Date().getFullYear() }}
      Stefan Kandić. All rights reserved.
      </p>
    </v-col>
    </v-row>  
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped>

  .footer {
    opacity: 0.9;
  }

  .link{
    font-size: 14px;
    text-decoration: none;
    font-weight: 400;
    letter-spacing: -.01em;
    font-family: "SF Pro Text","Myriad Set Pro","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
    color: #1d1d1f;
  }

</style>