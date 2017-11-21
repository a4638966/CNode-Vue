import {MUTATION_TYPES} from '../constant'

const login = {
  namespaced: true,
  state: {
    login: false,
    loginname: '',
    avatar_url: '',
    id: '',
  },
  mutations: {
    [MUTATION_TYPES.USER_LOGIN]: function (state, {loginname, avatar_url, id}) {
      state.login = true;
      state.loginname = loginname;
      state.avatar_url = avatar_url;
      state.id = id;
    }
  },
  actions: {
    [MUTATION_TYPES.USER_LOGIN]({commit}, loginStatus) {
      commit(MUTATION_TYPES.USER_LOGIN, loginStatus);
    }
  }
};

export default login;
