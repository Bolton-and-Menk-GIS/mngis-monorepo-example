import { TimezoneAPI, SunriseAPI } from "../services/api";

export default {

  setConfig(state, config){
    state.config = config
    state.api = new SunriseAPI(config.api.sunrise.url)
    state.tz = new TimezoneAPI(config.api.timezone.url, config.api.timezone.apiKey);
  },


  setSceneView(state, view){
    state.sceneView = view;
  },

  async setSelectedFeature(state, feature={}){
    state.selectedFeature = feature;
    if (feature){
      state.isFetching = true;
      const params = { lat: feature.geometry.latitude, lng: feature.geometry.longitude }
      // const tzInfo = await state.tz.getTimeZone(params);
      // state.gmtOffset = tzInfo.gmtOffset;
      const results  = await state.api.getSunriseData(params);
      state.city = feature.attributes[state.config.map.placeNameField] || feature.attributes.City;
      state.state = feature.attributes[state.config.map.stateeNameField] || feature.attributes.st;
      state.isFetching = false;
      state.sunrise = results.sunrise;
      state.sunset = results.sunset;
    }
  },

  setSelectedFeatures(state, features){
    state.selectedFeatures = features;
  }
  
}