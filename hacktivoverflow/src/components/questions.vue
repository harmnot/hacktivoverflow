<template>
  <b-container class="my-4">
    <div class="d-flex flex-row">
      <b-col lg="10">
        <div v-for="(question, index) in questions" :key="index" id="border" class="my-2 p-2">
          <b-row class="p-2">
            <b-col sm="2" class="p-2">
              <div class="d-flex flex-column" id="makeCenter">
                <i class="fas fa-sort-up size"></i>
                <span class="size"> {{ question.upvote.length - question.downvote.length }}</span>
                <i class="fas fa-sort-down size"></i>
              </div>
            </b-col>
            <b-col>
              <b-nav>
                <b-col>
                  <b-nav-item :to="'/question/' + question._id">
                    <h2>{{ question.title }}</h2>
                  </b-nav-item>
                </b-col>
              </b-nav>
              <b-col>
                <p
                  v-html="
                    question.content.split(' ').length >= 28
                      ? question.content
                          .split(' ')
                          .slice(0, 34)
                          .join(' ') + '.........'
                      : question.content
                  "
                ></p>
              </b-col>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col sm="4">
        <b-button variant="dark" to="/posting">Ask Question</b-button>
      </b-col>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'questions',
  props: ['questions'],
  methods: {},
};
</script>

<style lang="stylus">

#border
  border 1px solid
#makeCenter
  text-align center
.fa, .fab, .fal, .far, .fas
    line-height: 1.5
    cursor: pointer;
.size
    font-size 34px
</style>
