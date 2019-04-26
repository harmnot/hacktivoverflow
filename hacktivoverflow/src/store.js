import Vue from 'vue';
import Vuex from 'vuex';
import axios from './api/goaxios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: !!localStorage.getItem('token'),
    user: localStorage.getItem('id'),
    questions: [],
  },
  mutations: {
    GET_QUESTIONS(state, question) {
      state.questions = question;
    },
    isLoggin(state, payloadLogin) {
      state.isLogin = payloadLogin;
    },
    LOGOUT(state, payloadLogout) {
      state.isLogin = payloadLogout;
    },
  },
  actions: {
    async fetchQuestions({ commit }) {
      const { data } = await axios.get('/api/question/getall');
      commit('GET_QUESTIONS', data);
    },
  },
});
