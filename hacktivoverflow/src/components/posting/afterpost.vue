<template>
  <b-container>
    <!-- component question -->
    <Question :question="question" />
    <b-row>
      <b-col md="10" class="p-2 offset-md-1 my-4">
        <b-form @submit.prevent="answer">
          <ckeditor :editor="editor" v-model="content"></ckeditor>
          <b-button type="submit" variant="dark" class="p-2 my-4">submit answer</b-button>
        </b-form>
      </b-col>
    </b-row>

    <div id="borde">
      <div class="" v-for="(answers, index) in question.answers" :key="index">
        <b-row class="">
          <!-- <b-col>
          <h3 v-html="answers.answer"></h3>
        </b-col> -->
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
      </div>
    </div>
  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Question from './onequestion.vue';

export default {
  name: 'afterposting',
  components: {
    Question,
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

#makeCenter
  text-align center

.fa, .fab, .fal, .far, .fas
  line-height: 1.2
  cursor: pointer;

.size
  font-size 43px
.answer
  font-size: 20px
#borde
  background-color 'pink'
</style>
