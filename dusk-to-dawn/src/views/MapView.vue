<template>
  <div class="mapWrapper">
    <sunrise-sunset v-if="showSunrise" 
        :containerStyle="sunriseStyle" 
        @hide="showSunrise=false">
    </sunrise-sunset>
    <div id="viewDiv" class="view-container"></div>
  </div>
</template>

<script>
  import esriModules from '../modules/esriModules';
  import { mapGetters, mapActions } from 'vuex';
  import { widgets } from '@mngis/mapping-ui';
  import { nestedProp } from '@mngis/utils';
  import SunriseSunset from '../components/SunriseSunset';
  
  export default {
    name: 'map-view',

    components: {
      SunriseSunset
    },

    data(){
      return {
        currentBasemapIndex: 0,
        showSunrise: false,
        sunriseStyle: {
          position: 'absolute',
          'min-width': '350px',
          left: 'calc(50% - 175px)',
          top: '72px'
        }
      }
    },

    async mounted(){
      // window.mp = this;
      // make sure module is ready, then destructure to get desired esri modules
      const { 
        Graphic,
        Map, 
        MapView, 
        MapImageLayer,
        Search 
      } = await esriModules.ready;

      const map = new Map({
        basemap: "streets-night-vector"
      })

      const view = new MapView({
        map: map,
        container: 'viewDiv',
        center: [-93, 45],
        zoom: 8
      })

      // commit to store
      this.$store.commit('setSceneView', view);

      // wait for scene to load
      view.when(async () => {

        // add usa map service
        const mapImg = new MapImageLayer(this.config.map.mapImage);
        map.add(mapImg);

        // add search widget
        const search = new Search({ view })
        view.ui.add(search, this.config.map.widgets.search.position);

        // add basemap gallery or toggle
        await widgets.ready;
        const basemapWidget = nestedProp('map.widgets.basemap')(this.config);
        if (basemapWidget){
          if (basemapWidget.type === 'gallery'){
            widgets.addBasemapGallery(view, basemapWidget);

          } else if (basemapWidget.type === 'toggle'){
            widgets.addBasemapToggler(view, this, basemapWidget);
          }
        }
        
        // hit test
        view.popup.watch("visible", (visible)=> {

          // handle popup
          if (visible){
            // clear graphics
            view.graphics.removeAll()

            // update store
            this.handlePopup(view.popup);
            view.popup.close();

            // set selection graphic
            const graphic = new Graphic({
              geometry: view.popup.selectedFeature.geometry,
              symbol: this.config.map.selectionSymbol
            });
            view.graphics.add(graphic)
            this.showSunrise = true;
          } 
          
          // if (!view.popup.selectedFeature){
          //   this.showSunrise = false;
          // }
        });

        view.on('click', async (e)=> {
          // display popup
          this.showSunrise = false;
        })

      })
      .catch((err) => {
        // A rejected view indicates a fatal error making it unable to display,
        // this usually means that WebGL is not available, or too old.
        console.error("MapView rejected:", err);
      });
    },


    methods: {
      ...mapActions([
        'handlePopup'
      ])
    },

    computed: {
      ...mapGetters([
        'sceneView', 
        'config'
      ])
    }

  }

</script>

<style>

  .view-container {
    height: calc(100vh - 60px);
    width: 100%;
  }

</style>