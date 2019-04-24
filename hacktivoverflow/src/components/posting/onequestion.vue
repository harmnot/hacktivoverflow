<template>
  <b-container>
    <b-row>
      <b-col sm="2">
        <div class="d-flex flex-column" id="makeCenter">
          <i class="fas fa-sort-up size" @click="upQuestion(question._id)"></i>
          <span class="size"> 0 </span>
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
};
</script>

<style lang="css" scoped></style>
