<template>
  <b-container id="fonts">
    <!-- component question -->
    <Loader v-if="!question" />
    <Question :question="question" id="back" v-else />
    <!--  -->

    <b-row>
      <b-col md="10" class="p-2 offset-md-1 my-4">
        <b-form @submit.prevent="answer">
          <ckeditor :editor="editor" v-model="content"></ckeditor>
          <b-button type="submit" variant="dark" class="p-2 my-4">submit answer</b-button>
        </b-form>
      </b-col>
    </b-row>

    <Answers
      v-for="(answers, index) in question.answers"
      :id="answers._id"
      :upvote="answers.upvote.length"
      :downvote="answers.downvote.length"
      :theanswer="answers.answer"
      :name="answers.user.name"
      :create="answers.created_at"
      :data="question._id"
    />
  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Question from './onequestion.vue';
import Loader from '../../views/loader.vue';
import Answers from '../../answer/answer.vue';
import Eventbus from '../../Eventbus.js';
export default {
  name: 'afterposting',
  components: {
    Question,
    Loader,
    Answers,
  },
  data() {
    return {
      editor: ClassicEditor,
      content: '',
      question: '',
      answers: '',
    };
  },
  methods: {
    getQuestionParams() {
      const id = this.$route.params.id;
      this.$axios
        .get('/api/question/userquestion/' + id)
        .then(({ data }) => {
          this.question = data;
        })
        .catch(err => {
          console.log(err.response);

          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    answer() {
      if (!localStorage.getItem('token')) {
        this.$swal.fire({
          type: 'error',
          text: 'you are not allow to do this, first login',
        });
        this.content = '';
      } else {
        this.$axios
          .post(
            '/api/answer/create',
            {
              fromquestion: this.$route.params.id,
              answer: this.content,
            },
            {
              headers: {
                token: localStorage.getItem('token'),
              },
            },
          )
          .then(({ data }) => {
            return this.$axios.put(
              '/api/question/update/' + this.$route.params.id,
              {
                $addToSet: { answers: data._id },
              },
              {
                headers: {
                  token: localStorage.getItem('token'),
                },
              },
            );
          })
          .then(data => {
            this.getQuestionParams();
            this.content = '';
          })
          .catch(err => {
            console.log(err.response);
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      }
    },
    godelete(id) {
      console.log(id);
    },
    // deleting(id) {
    //   if (!localStorage.getItem('token')) {
    //     this.$swal.fire({
    //       type: 'error',
    //       text: 'you are not allow to do this, first login',
    //     });
    //   } else {
    //     this.$axios
    //       .delete('/api/answer/delete/' + id, {
    //         headers: {
    //           token: localStorage.getItem('token'),
    //         },
    //       })
    //       .then(({ data }) => {
    //         console.log(data);
    //       })
    //       .catch(err => {
    //         console.log(err.response);
    //         this.$swal.fire({
    //           type: 'error',
    //           text: err.response.data.error,
    //         });
    //       });
    //   }
    // },
    // edit(id) {
    //   if (!localStorage.getItem('token')) {
    //     this.$swal.fire({
    //       type: 'error',
    //       text: 'you are not allow to do this, first login',
    //     });
    //   } else {
    //     this.$axios
    //       .put('/api/answer/update/' + id)
    //       .then(({ data }) => {
    //         console.log(data);
    //       })
    //       .catch(err => {
    //         this.$swal.fire({
    //           type: 'error',
    //           text: err.response.data.error,
    //         });
    //       });
    //   }
    // },
    // upAnswer(id) {
    //   if (!localStorage.getItem('token')) {
    //     this.$swal.fire({
    //       type: 'error',
    //       text: 'you are not allow to do this, first login',
    //     });
    //   } else {
    //     this.$axios
    //       .put(
    //         '/api/answer/updatevote/' + id,
    //         {
    //           upvote: true,
    //         },
    //         {
    //           headers: {
    //             token: localStorage.getItem('token'),
    //           },
    //         },
    //       )
    //       .then(({ data }) => {
    //         console.log(data);
    //       })
    //       .catch(err => {
    //         console.log(err.response);
    //         this.$swal.fire({
    //           type: 'error',
    //           text: err.response.data.error,
    //         });
    //       });
    //   }
    // },
    // downAnswer(id) {
    //   if (!localStorage.getItem('token')) {
    //     this.$swal.fire({
    //       type: 'error',
    //       text: 'you are not allow to do this, first login',
    //     });
    //   } else {
    //     this.$axios
    //       .put(
    //         '/api/answer/updatevote/' + id,
    //         {
    //           downvote: true,
    //         },
    //         {
    //           headers: {
    //             token: localStorage.getItem('token'),
    //           },
    //         },
    //       )
    //       .then(({ data }) => {
    //         console.log(data);
    //       })
    //       .catch(err => {
    //         this.$swal.fire({
    //           type: 'error',
    //           text: err.response.data.error,
    //         });
    //       });
    //   }
    // },
  },
  mounted() {
    this.getQuestionParams();
  },
  updated() {
    this.$nextTick(() => {
      this.getQuestionParams();
    });
  },
};
</script>

<style lang="stylus" scoped>
@import url('https://rsms.me/inter/inter.css')

#back
  background #f4f4f4
  border-radius 20px

#fonts
  font-family 'iner', sans-serif
  margin-top 5rem;
#makeCenter
  text-align center
.fa, .fab, .fal, .far, .fas
  line-height: 1.2
  cursor: pointer;
.colos
  color rgb(138, 150, 144)
.size
  font-size 43px
.answer
  font-size: 20px
#borde
  border 1px solid
  margin 0 auto
.cursor
  cursor: pointer;
  // background-color rgb(191, 121, 47)
</style>
