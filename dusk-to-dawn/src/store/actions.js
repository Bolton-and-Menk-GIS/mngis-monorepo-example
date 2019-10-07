export default {

  async handlePopup({ commit, getters }, popup){
    console.log('selected feature: ', popup.selectedFeature)
    commit('setSelectedFeature', popup.selectedFeature);
    commit('setSelectedFeatures', popup.selectedFeatures);
  }
}