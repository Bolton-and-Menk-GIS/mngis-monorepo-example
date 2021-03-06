import { loadModules } from 'esri-loader';

const POSITION_DEFAULT = {
  position: 'top-right'
}

const TOGGLER_DEFAULT = {
  maps: ['topo', 'satellite'],
  options: {
    activeBasemap: 'topo'
  },
  ...POSITION_DEFAULT
}

const GALLERY_DEFAULT = {
  options: {
    activeBasemap: 'topo'
  },
  ...POSITION_DEFAULT
}

// could also bring in the `@types/arcgis-js-api`
/**
 * An ArcGIS MapView
 * @typedef {Object} MapView
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
 */

 /**
 * An ArcGIS SceneView
 * @typedef {Object} SceneView
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html
 */

/**
 * @typedef {( 'bottom-leading' | 'bottom-left' | 'bottom-right' | 'bottom-trailing' | 'top-leading' | 'top-left' | 'top-right' | 'top-trailing' | 'manual' )} WigetPosition
 */

/** 
 * basemap toggle options
 * @typedef {Object} ToggleWidgetOptions
 * @property {String} [title] - widget's title
 * @property {Boolean} [titleVisible=false] - boolean to set whether the basemap label is visible
 */

/** 
 * basemap gallery options
 * @typedef {Object} GalleryWidgetOptions
 * @property {String} [title] - widget's title
 * @property {Object} [source] - The source for basemaps that the widget will display.
 */

/**
 * Represents a Toggle Widget Configuration
 * @typedef {Object} GalleryWidgetConfig
 * @property {String[]} maps - array of basemap names
 * @property {GalleryWidgetOptions} options - {@link ToggleWidgetConfig} object
 * @property {WidgetPosition} - {@link WidgetPosition} 
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html
 */

/**
 * Represents a Gallery Widget Configuration
 * @typedef {Object} ToggleWidgetConfig
 * @property {String[]} maps - array of basemap names
 * @property {ToggleWidgetConfig} options - {@link ToggleWidgetConfig} object
 * @property {WidgetPosition} - {@link WidgetPosition}
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapToggle.html
 */

/**
 * @namespace 
 */
const widgets = {};

widgets.ready = new Promise(async (resolve, reject) => {
  try {

    const [ Expand, BasemapGallery, BasemapToggle ] = await loadModules([
      'esri/widgets/Expand', 
      'esri/widgets/BasemapGallery', 
      'esri/widgets/BasemapToggle',
    ]);
  
    /**
     * adds the BasemapGallery Widget
     * @param {MapView|SceneView} view - mapview or sceneview
     * @param {GalleryWidgetConfig} config - {@link GalleryWidgetConfig} for gallery widget
     */
    widgets.addBasemapGallery = function(view, config=GALLERY_DEFAULT){
      const bg = new BasemapGallery({
        view: view,
        container: document.createElement('div'),
        ...config.options
      });
      const expand = new Expand({
        view: view,
        content: bg.domNode,
        expandIconClass: 'esri-icon-basemap'
      });
      view.ui.add(expand, config.position || 'top-right');
    }
  
    /**
     * adds the BasemapGallery Widget
     * @param {MapView|SceneView} view - map or scene view
     * @param {ToggleWidgetConfig} config - config options for widget
     */
    widgets.addBasemapToggler = function (view, context, config=TOGGLER_DEFAULT){
      // toggle basemap
      console.log('BASEMAP TOGGLE IS: ', BasemapToggle)
      const bt = new BasemapToggle({
        view: view,
        nextBasemap: config.maps[context.currentBasemapIndex + 1] || 'topo',
        ...config.options
      });
  
      // handle logic to shuffle through basemaps
      if (!('currentBasemapIndex' in context)){
        context.currentBasemapIndex = 0;
      }
      bt.on('toggle', (obj)=>{
        context.currentBasemapIndex = config.maps.indexOf(obj.current.id);
        if (context.currentBasemapIndex === config.maps.length-1){
          obj.target.nextBasemap = config.maps[0];
        } else {
          obj.target.nextBasemap = config.maps[context.currentBasemapIndex + 1];
        }
      });
  
      view.ui.add(bt, config.position || 'top-right');
    }
    resolve(widgets)
  } catch(err){
    reject(err);
  }

})

export default widgets;