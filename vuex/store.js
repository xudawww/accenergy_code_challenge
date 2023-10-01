
import Vuex from 'vuex';
import searchListModule from './modules/SearchListModule';

//Make it in modules so that it could be extensive in the future(can add other modules.)
const store = new Vuex.Store({
  modules: {
    search: searchListModule
  }
});
export default store;
