<template>
  <b-container>
    <b-form @submit.prevent="askquestion">
      <b-row id="height">
        <b-col sm="2" class="p-2 mx-auto">
          <label for="title"> title </label>
        </b-col>
        <b-col md="10" class="p-2 mx-auto">
          <b-form-input v-model="title"></b-form-input>
        </b-col>
        <b-col md="12" class="p-2">
          <ckeditor :editor="editor" v-model="content"></ckeditor>
        </b-col>
        <b-col>
          <b-button type="submit" variant="dark">submit</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  name: 'posting',
  components: {},
  compoted: {
    datatitle(d) {
      this.title = d;
    },
  },
  data() {
    return {
      question: null,
      content: '',
      title: '',
      editor: ClassicEditor,
    };
  },
  methods: {
    edit() {
      const token = localStorage.getItem('token');
      this.$axios
        .post(
          '/api/question/add',
          {
            title: this.title,
            content: this.content,
          },
          {
            headers: {
              token,
            },
          },
        )
        .then(({ data }) => {
          console.log(data._id, 'ini add questions');

          this.$router.replace({ path: '/question/' + data._id });
          // this.$swal.fire({
          //   type: 'success',
          //   text: 'succesfully ask question',
          // });
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    getQuestionParams() {
      const id = this.$route.params.id;
      this.$axios
        .get('/api/question/userquestion/' + id)
        .then(({ data }) => {
          this.question = data;
          this.title = data.title;
          this.content = data.content;
        })
        .catch(err => {
          console.log(err.response);

          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    askquestion() {
      this.$axios
        .put(
          '/api/question/update/' + this.$route.params.id,
          {
            title: this.title,
            content: this.content,
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({ data }) => {
          console.log(data);
          this.$router.push('/question/' + this.$route.params.id);
        })
        .catch(e => {
          this.$swal.fire({
            type: 'errror',
            type: e.response.data.error,
          });
        });
    },
  },
  mounted() {
    this.getQuestionParams();
  },
};
</script>

<style lang="stylus" scoped>
#height
  margin-top 120px
</style>
