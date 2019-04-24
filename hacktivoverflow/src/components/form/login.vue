<template>
  <b-container id="font">
    <b-card bg-variant="light">
      <b-form @submit.prevent="login">
        <b-form-group
          label-cols-lg="3"
          label="Login"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group label-cols-sm="3" label="email:" label-align-sm="right" label-for="email">
            <b-form-input id="email" v-model="form.email"></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="password:"
            label-align-sm="right"
            label-for="password"
          >
            <b-form-input type="password" id="password" v-model="form.password"></b-form-input>
          </b-form-group>
        </b-form-group>
        <b-button type="submit" variant="dark">Login</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      console.log(this.form);
      this.$axios
        .post('/api/people/login', { ...this.form })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          this.$router.replace({ path: '/' });
          this.$store.commit('isLoggin', true);
          this.$swal.fire({
            type: 'success',
            text: 'succesfully login',
          });
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$router.replace({ path: '/' });
    }
  },
};
</script>

<style lang="stylus" scoped>

#font
  font-family  'Inter', sans-serif


.card-body
  background: #ff9966 /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff5e62, #ff9966)  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ff5e62, #ff9966) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
</style>
