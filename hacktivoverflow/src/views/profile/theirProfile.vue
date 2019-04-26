<template lang="html">
  <b-container> </b-container>
</template>

<script>
export default {
  name: 'profile',
  props: [],
  data() {
    return {};
  },
  methods: {
    fetchUser() {
      this.$axios
        .get('/api/question/userquestion/' + this.$route.params.id)
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped></style>
