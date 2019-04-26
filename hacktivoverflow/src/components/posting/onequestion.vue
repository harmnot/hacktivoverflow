<template>
  <b-container>
    <b-row class="p-2">
      <b-col sm="2" class="p-4">
        <div class="d-flex flex-column" id="makeCenter">
          <i class="fas fa-sort-up size" @click="upQuestion(question._id)"></i>
          <span class="size"> {{ question.upvote.length - question.downvote.length }}</span>
          <i class="fas fa-sort-down size" @click="downQuestion(question._id)"></i>
        </div>
      </b-col>
      <b-col class="p-4">
        <b-col>
          <h2>{{ question.title }}</h2>
        </b-col>
        <b-col>
          <p v-html="question.content"></p>
          <div class="d-flex flex-column float-right">
            <label for="name" class="float-right"> {{ question.user.name }}</label>
            <label for="name" class="float-right"> {{ toISO(question.created_at) }}</label>
          </div>

          <div class="d-flex flex-row" v-if="id == question.user._id">
            <label for="edit" class="p-2" id="coloredit" @click="edit(question._id)"> edit </label>
            <label for="edit" class="p-2" id="colordelete" @click="deleting(question._id)">
              delete
            </label>
          </div>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment';
export default {
  name: 'justonequestion',
  props: ['question'],
  data() {
    return {
      id: localStorage.getItem('id'),
    };
  },
  methods: {
    edit(id) {
      this.$router.push('/edit/' + id);
    },
    upQuestion(id) {
      if (localStorage.getItem('token')) {
        this.$axios
          .put(
            '/api/question/vote/' + id,
            {
              upvote: true,
            },
            {
              headers: {
                token: localStorage.getItem('token'),
              },
            },
          )
          .then(({ data }) => {
            console.log(data);
          })
          .catch(err => {
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      } else {
        this.$swal.fire({
          type: 'error',
          text: 'you need to login first',
        });
      }
    },
    downQuestion(id) {
      if (localStorage.getItem('token')) {
        this.$axios
          .put(
            '/api/question/vote/' + id,
            {
              downvote: true,
            },
            {
              headers: {
                token: localStorage.getItem('token'),
              },
            },
          )
          .then(({ data }) => {
            console.log(data);
          })
          .catch(err => {
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      } else {
        this.$swal.fire({
          type: 'error',
          text: 'you need to login first',
        });
      }
    },
    deleting(id) {
      this.$axios
        .delete('/api/question/delete/' + id, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          this.$router.push('/');
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    toISO(val) {
      return moment(val).format('LLL');
    },
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped>
#coloredit
  color rgb(117, 94, 77)
  cursor pointer
#colordelete
  color rgba(233, 55, 8, 0.99)
  cursor pointer
</style>
