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

const widgets = {};

widgets.ready = new Promise(async (resolve, reject) => {

  const [ Expand, BasemapGallery, BasemapToggle ] = await loadModules([
    'esri/widgets/Expand', 
    'esri/widgets/BasemapGallery', 
    'esri/widgets/BasemapToggle',
  ]);

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
})

export default widgets;