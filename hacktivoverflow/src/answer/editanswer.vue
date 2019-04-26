<template lang="html">
  <b-container class="my-4">
    <b-form @submit.prevent="edit">
      <b-row id="height">
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
  name: 'editanswer',
  data() {
    return {
      editor: ClassicEditor,
      fromquestion: '',
      content: '',
    };
  },
  methods: {
    fetchAnswer() {
      this.$axios
        .get('/api/answer/get/' + this.$route.params.id)
        .then(({ data }) => {
          this.content = data.answer;
          this.fromquestion = data.answer.fromquestion._id.toString();
          console.log(data, 'ini answer');
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
    edit() {
      this.$axios
        .put(
          '/api/answer/update/' + this.$route.params.id,
          {
            answer: this.content,
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({ data }) => {
          console.log(data);
          this.$router.push('/question/' + this.$route.params.question);
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
    this.fetchAnswer();
  },
};
</script>

<style lang="css" scoped></style>
