<template>
  <b-container>
    <b-row>
      <b-col sm="2">
        <div class="d-flex flex-column" id="makeCenter">
          <i class="fas fa-sort-up size" @click="upQuestion(question._id)"></i>
          <span class="size"> {{ question.upvote.length - question.downvote.length }}</span>
          <i class="fas fa-sort-down size" @click="downQuestion(question._id)"></i>
        </div>
      </b-col>
      <b-col>
        <b-col>
          <h2>{{ question.title }}</h2>
        </b-col>
        <b-col>
          <p v-html="question.content"></p>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'justonequestion',
  props: ['question'],
  methods: {
    upQuestion(id) {
      if (localStorage.getItem('token')) {
        this.$axios
          .put(
            '/api/question/update/' + id,
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
            '/api/question/update/' + id,
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
  },
};
</script>

<style lang="css" scoped></style>
