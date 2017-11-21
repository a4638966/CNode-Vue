import {MUTATION_TYPES} from '../constant'

const login = {
  namespaced: true,
  state: {
    login: false,
    loginname: '',
    avatar_url: '',
    id: '',
    accesstoken: ''
  },
  mutations: {
    [MUTATION_TYPES.USER_LOGIN]: function (state, {loginname, avatar_url, id, accesstoken}) {
      state.login = true;
      state.loginname = loginname;
      state.avatar_url = avatar_url;
      state.id = id;
      state.accesstoken = accesstoken;
    }
  },
  actions: {
    [MUTATION_TYPES.USER_LOGIN]({commit}, loginStatus) {
      commit(MUTATION_TYPES.USER_LOGIN, loginStatus);
    }
  }
};

export default login;
