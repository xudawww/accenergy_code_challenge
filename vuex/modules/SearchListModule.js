import { v4 as uuidv4 } from 'uuid'
//module of searchList
const state = {
  //Data we need to use in address list and map
  searchList: [],
  //Mimic the loading process we call api online
  loading: false,
  //Generating errors when necessary
  error: null,
  //currentLocation
  currentLocation: { latlng: { lat: 40.689247, lng: -74.044502 } },
};

const mutations = {
  insertSearchList(state, payload) {
    //Insert ID and push into searchList,
    //In order to prevent number id might be duplicated once you delete and insert,
    //I used uuid
    state.searchList.push({ ...payload, id: uuidv4() });
  },
  deleteSearchList(state, payload) {
    //Delete item by group of id
    state.searchList = payload;
  },
  setLoading(state, payload) {
    //Set loading status
    state.loading = payload;
  },
  setError(state, payload) {
    //Set error msg
    state.error = payload;
  },
  setCurretLocation(state, payload) {
    //Set current location
    state.currentLocation = payload;
  },
}

const actions = {
  //Pretending call the API from server and insert the search list, for 2 seconds
  insertSearchList({ commit }, payload) {
    //Set loading start
    commit('setLoading', true);
    //Reset error everytime you insert item, this is to prevent you insert the item when there is still have error showing up
    commit('setError', null);
    //Check if duplicated items found
    const ifDucpliated = state.searchList.find(
      (e) => e.latlng.lat === payload.latlng.lat && e.latlng.lng === payload.latlng.lng
    );
    //Trigger error when duplicated items found before inserting
    if (ifDucpliated) {
      const errMsg = 'Duplicated item found! please choose different one!';
      commit('setError', errMsg);
      commit('setLoading', false);
      //3 seconds later the error will be reset to let it vanish
      setTimeout(() => {
        commit('setError', null);
      }, 3000);
      return;
    }
    //Reset loading
    setTimeout(() => {
      commit('insertSearchList', payload);
      commit('setCurretLocation', {
        latlng: { lat: payload.latlng.lat, lng: payload.latlng.lng }
      });
      commit('setLoading', false);
    }, 2000);
  },

  //Pretending call the API from server and delete the search list, for 2 seconds
  deleteSearchList({ commit }, payload) {
    commit('setLoading', true);
    setTimeout(() => {
      commit(
        'deleteSearchList',
        state.searchList.filter((item) => !payload.includes(item.id))
      );
      commit('setLoading', false);
    }, 2000);
  }
}
// Numbers of getters will be used by components
const getters = {
  getMapSearchList: (state) =>
    state.searchList.map((e) => {
      return { ...e.latlng }
    }),
  getAllSearchInfoList: (state) => state.searchList,
  getErrorMsg: (state) => state.error,
  getLoading: (state) => state.loading,
  getCurrentLocation: (state) => state.currentLocation,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
