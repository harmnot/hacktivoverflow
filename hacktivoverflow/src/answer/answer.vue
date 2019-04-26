<template lang="html">
  <b-container>
    <div class="" :key="id" class="p-2 my-2">
      <b-col sm="10" offset="1" id="borde">
        <b-row class="">
          <b-col sm="2" class="p-2">
            <div class="d-flex flex-column" id="makeCenter">
              <i class="fas fa-sort-up answer" @click="upAnswer(id)"></i>
              <span class="answer"> {{ upvote - downvote }}</span>
              <i class="fas fa-sort-down answer" @click="downAnswer(id)"></i>
            </div>
          </b-col>
          <b-col class="p-2 ">
            <b-col class="p-2 my-2">
              <p v-html="theanswer"></p>
              <div class="d-flex flex-column float-right">
                <span for="name"> {{ name }}</span>
                <span for="name"> {{ toISO(create) }}</span>
              </div>
            </b-col>
          </b-col>
        </b-row>
        <b-col offset="1">
          <div class="d-flex flex-row colos">
            <label for="delete" @click="deleting(id)" class="p-2 mx-2 cursor">
              {{ isDelete ? 'delete' : 'deleting......' }}
            </label>
            <label for="edit" @click="edit(id)" class="p-2 mx-2 cursor">
              edit
            </label>
          </div></b-col
        >
      </b-col>
    </div>
  </b-container>
</template>

<script>
import Eventbus from '../Eventbus.js';
import moment from 'moment';
export default {
  name: 'answers',
  props: ['id', 'upvote', 'downvote', 'theanswer', 'name', 'create', 'data'],
  data() {
    return {
      isDelete: true,
    };
  },
  methods: {
    deleting(id) {
      if (!localStorage.getItem('token')) {
        this.$swal.fire({
          type: 'error',
          text: 'you are not allow to do this, first login',
        });
      } else {
        this.isDelete = false;
        this.$axios
          .delete('/api/answer/delete/' + id, {
            headers: {
              token: localStorage.getItem('token'),
            },
          })
          .then(({ data }) => {
            this.isDelete = true;
          })
          .catch(err => {
            this.isDelete = true;
            console.log(err.response);
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      }
    },
    edit(id) {
      if (!localStorage.getItem('token')) {
        this.$swal.fire({
          type: 'error',
          text: 'you are not allow to do this, first login',
        });
      } else {
        this.$axios
          .put('/api/answer/update/' + id)
          .then(({ data }) => {
            console.log(data);
          })
          .catch(err => {
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      }
    },
    upAnswer(id) {
      if (!localStorage.getItem('token')) {
        this.$swal.fire({
          type: 'error',
          text: 'you are not allow to do this, first login',
        });
      } else {
        this.$axios
          .put(
            '/api/answer/updatevote/' + id,
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
            console.log(err.response);
            this.$swal.fire({
              type: 'error',
              text: err.response.data.error,
            });
          });
      }
    },
    downAnswer(id) {
      if (!localStorage.getItem('token')) {
        this.$swal.fire({
          type: 'error',
          text: 'you are not allow to do this, first login',
        });
      } else {
        this.$axios
          .put(
            '/api/answer/updatevote/' + id,
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
      }
    },
    toISO(val) {
      return moment(val).format('LLL');
    },
    edit(id) {
      this.$router.push('/answer/' + id + '/fromquestion/' + this.data);
    },
  },
};
</script>

<style lang="stylus" scoped>

@import url('https://rsms.me/inter/inter.css')


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
  cursor: pointer
span
  font-size: 11px
</style>
