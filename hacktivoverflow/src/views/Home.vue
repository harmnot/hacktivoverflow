<template>
  <Loader v-if="!questions.length" />
  <Questions :questions="questions" v-else></Questions>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/form/login.vue';
import { mapState, mapActions } from 'vuex';
import Questions from '../components/questions.vue';
import Loader from './loader.vue';

export default {
  name: 'home',
  components: {
    Questions,
    Loader,
  },
  computed: {
    ...mapState(['questions']),
  },
  data() {
    return {};
  },
  methods: {
    // ...mapActions(['fetchQuestions']),
  },
  created() {
    this.$store.dispatch('fetchQuestions');
    console.log(this.$store.state, 'iniiiiiiiii');
  },
};
</script>

<style lang="stylus" scoped>
#border
  border 1px solid
#makeCenter
  text-align center
.fa, .fab, .fal, .far, .fas
    line-height: 1
.size
    font-size 33px
</style>
