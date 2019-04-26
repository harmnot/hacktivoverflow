<template>
  <b-container id="font" class="p-2">
    <b-nav class="d-flex justify-content-between" id="colorNav">
      <b-nav-item to="/" id="logo"> Hacktivoferflow </b-nav-item>

      <b-col sm="4" id="tengah" class="mt-auto p-2">
        <b-input placeholder="search questions..."></b-input>
      </b-col>

      <div class="d-flex flex-row" v-if="$store.state.isLogin == false">
        <b-nav-item class="p-2" to="/login"> Login </b-nav-item>
        <b-nav-item class="p-2" to="/register" id="register">
          REGISTER
        </b-nav-item>
      </div>
      <div class="d-flex flex-row" v-else>
        <!-- <b-nav-item class="p-2" to="/profile"> profile </b-nav-item> -->
        <b-nav-item class="p-2" to="/" @click="logout">
          Logout
        </b-nav-item>
      </div>
    </b-nav>
  </b-container>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('LOGOUT', false);
      this.$swal.fire({
        type: 'success',
        text: 'you are succesfully logout',
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import url('https://rsms.me/inter/inter.css')
@import url('https://fonts.googleapis.com/css?family=Secular+One');

#logo
  font-family 'Secular One', sans-serif
  font-size 25px
#tengah

#font
  font-family 'Inter', sans-serif
  font-weight 600
#colorNav li a
  color rgb(3, 2, 1)
#register
  border 1px solid #ff9966
</style>
