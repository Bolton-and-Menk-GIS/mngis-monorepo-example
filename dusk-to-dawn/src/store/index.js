import Vuex from "vuex";
import Vue from 'vue';
import actions from './actions';
import mutations from './mutations';

// register vuex plugin
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    config: null,
    sceneView: null,
    api: null,
    tz: null,
    selectedFeatures: [],
    selectedFeature: null,
    isFetching: false,
    city: null,
    state: null,
    sunrise: null,
    sunset: null,
    gmtOffset: null
  },

  getters: {
    config: state => state.config,
    sceneView: state => state.scenView,
    api: state => state.api,
    tz: state => state.tz, 
    selectedFeatures: state => state.selectedFeatures,
    selectedFeature: state => state.selectedFeature,
    isFetching: state => state.isFetching,
    city: state => state.city,
    state: state => state.state,
    sunrise: state => state.sunrise,
    sunset: state => state.sunset,
    gmtOffset: state => state.gmtOffset,
  },

  // add in actions and mutations
  actions,
  mutations
})