<template>
  <b-container id="font">
    <b-card bg-variant="light">
      <b-form @submit.prevent="register">
        <b-form-group
          label-cols-lg="3"
          label="Register"
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

          <b-form-group label-cols-sm="3" label="name:" label-align-sm="right" label-for="name">
            <b-form-input id="name" v-model="form.name"></b-form-input>
          </b-form-group>
        </b-form-group>
        <b-button type="submit" variant="dark">Register</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      form: {
        email: '',
        password: '',
        name: '',
      },
    };
  },
  methods: {
    register() {
      this.$axios
        .post('/api/people/register', { ...this.form })
        .then(({ data }) => {
          console.log(data);
          this.$swal.fire({
            type: 'success',
            text: 'successfully register',
          });
        })
        .catch(err => {
          console.log('err.response', err.response);
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
  font-family 'Inter', sans-serif
.card-body
  background: #ff9966 /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff5e62, #ff9966)  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ff5e62, #ff9966) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
</style>
