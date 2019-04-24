<template>
  <b-container id="fonts">
    <!-- component question -->
    <Loader v-if="!question" />
    <Question :question="question" id="back" v-else />
    <b-row>
      <b-col md="10" class="p-2 offset-md-1 my-4">
        <b-form @submit.prevent="answer">
          <ckeditor :editor="editor" v-model="content"></ckeditor>
          <b-button type="submit" variant="dark" class="p-2 my-4">submit answer</b-button>
        </b-form>
      </b-col>
    </b-row>

    <Loader v-if="!question.answers" />
    <div class="" v-for="(answers, index) in question.answers" :key="index" class="p-2 my-2" v-else>
      <b-col sm="10" offset="1" id="borde">
        <b-row class="">
          <b-col sm="2" class="p-2">
            <div class="d-flex flex-column" id="makeCenter">
              <i class="fas fa-sort-up answer" @click="upAnswer(answers._id)"></i>
              <span class="answer"> {{ answers.upvote.length - answers.downvote.length }}</span>
              <i class="fas fa-sort-down answer" @click="downAnswer(answers._id)"></i>
            </div>
          </b-col>
          <b-col class="p-2 ">
            <b-col class="p-2 my-2">
              <p v-html="answers.answer"></p>
            </b-col>
          </b-col>
        </b-row>
        <b-col offset="1">
          <div class="d-flex flex-row colos">
            <label for="delete" class="p-2 mx-2 cursor"> delete </label>
            <label for="delete" class="p-2 mx-2 cursor"> edit </label>
          </div></b-col
        >
      </b-col>
    </div>
  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Question from './onequestion.vue';
import Loader from '../../views/loader.vue';

export default {
  name: 'afterposting',
  components: {
    Question,
    Loader,
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
          console.log(this.question, 'ini questions');
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
      } else {
      }
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
          return this.$axios.put('/api/question/update/' + this.$route.params.id, {
            $addToSet: { answers: data._id },
          });
        })
        .then(data => {
          this.getQuestionParams();
          this.content = '';
          console.log(data, 'ini jawaban');
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    upAnswer(id) {
      console.log(id);
    },
    downAnswer(id) {
      console.log(id);
    },
  },
  mounted() {
    this.getQuestionParams();
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
