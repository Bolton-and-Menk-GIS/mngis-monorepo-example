import { loadModules, loadCss } from 'esri-loader';

const esriModules = {
  ready: new Promise(async function(resolve, reject){
    // load JS API CSS first
    loadCss();

    // bring in esri modules
    try {
      const [
        Map,
        SceneView,
        MapView,
        Graphic,
        Expand, 
        BasemapGallery, 
        BasemapToggle,
        FeatureLayer,
        MapImageLayer,
        GraphicsLayer,
        SpatialReference,
        Search,
        WebScene
      ] = await loadModules([
        'esri/Map',
        'esri/views/SceneView',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/widgets/Expand', 
        'esri/widgets/BasemapGallery', 
        'esri/widgets/BasemapToggle',
        'esri/layers/FeatureLayer',
        'esri/layers/MapImageLayer',
        'esri/layers/GraphicsLayer',
        'esri/geometry/SpatialReference',
        'esri/widgets/Search',
        'esri/WebScene',
      ]);

      const esri = {
        Map,
        SceneView,
        MapView,
        Graphic,
        Expand, 
        BasemapGallery, 
        BasemapToggle,
        FeatureLayer,
        MapImageLayer,
        GraphicsLayer,
        SpatialReference,
        Search,
        WebScene
      }
      console.log('ESRI IS: ', esri);
      Object.assign(esriModules, esri);

      // return namespace with all modules available
      resolve(esri);

    } catch(err){
      reject(err);
    }
  })
}

export default esriModules;