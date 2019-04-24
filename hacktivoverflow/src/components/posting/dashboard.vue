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
          <b-button type="submit" variant="dark">ask</b-button>
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
  data() {
    return {
      content: '',
      title: '',
      editor: ClassicEditor,
    };
  },
  methods: {
    askquestion() {
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
          console.log(data, 'ini add questions');
          this.$route.push(`/question/${data._id}`);
          this.$swal.fire({
            type: 'success',
            text: 'succesfully ask question',
          });
        })
        .catch(err => {
          this.$swal.fire({
            type: 'error',
            text: err.response.data.error,
          });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
#height
  margin-top 120px
</style>
