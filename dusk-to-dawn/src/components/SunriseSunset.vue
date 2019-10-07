<template>
  <div class="sunrise-container" :style="containerStyle">
    

    <b-card :title="`${city}${state ? ',' + state: ''}`">
      <div class="close-btn" style="color: gray" @click="$emit('hide')">X</div>

      <!-- <div class="sunrise-body"> -->

        <div class="loading-indicator" v-if="isFetching">
          <b-spinner variant="success" class="mx-auto"></b-spinner>
        </div>

        <div class="mt-2" v-else>

          <vue-slider :min="7200" :max="secondsInDay" :value="sliderValue" v-bind="sliderOpts">
            <template slot="tooltip" scope="tooltip">
              <!-- Here we're using a scoped-slot. It's an
                  advanced, but incredibly useful pattern.
                  However, explaining it is outside the 
                  scope of this example. 
                  Here's a great explanation of them:
                  https://adamwathan.me/renderless-components-in-vuejs/
              -->
              <div v-if="tooltip.index === 0">
                {{ sunriseLocale }}
              </div >
              <div v-else>
                {{ sunsetLocale }}
              </div>
            </template>
          </vue-slider>
        </div>
      <!-- </div> -->
    </b-card>

    <!-- <div class="sunrise-container" v-else>
      <h4>{{ city }}</h4>
      <vue-slider v-model="value" />
    </div> -->

  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/antd.css'
  import { mapGetters } from 'vuex';
  import { getSeconds } from '@mngis/utils';

  export default {
    name: 'sunrise-sunset',

    components: {
      VueSlider
    },

    props: {
      containerStyle: {
        type: Object,
        default(){
          return {};
        }
      }
    },

    data(){
      return {
       secondsInDay: 60 * 60 * 24,
       sliderOpts: {
         style: {
           'margin-top': '3.25rem',
           'font-size': '0.75rem',
           color: 'gray'
         },
         tooltip: 'always',
         tooltipStyle: {
           'font-size': '0.75rem'
         }
       }
      }
    },

    mounted(){
      window.sun = this;
      console.log('MOUNTED SUNRISE: ', this)
    },

    methods: {
      parseTime(ts){
        const date = new Date(ts);
        return getSeconds({
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds()
        })
      }
    
    },

    computed: {
      ...mapGetters([
        'city',
        'state',
        'isFetching',
        'gmtOffset',
        'sunrise',
        'sunset'
      ]),

      sunriseLocale(){
        return new Date(this.sunrise).toLocaleTimeString();
      },

      sunsetLocale(){
        return new Date(this.sunset).toLocaleTimeString();
      },

      sliderValue(){
        return [this.parseTime(this.sunrise), this.parseTime(this.sunset)];
      }

    }

  }

</script>

<style>

  /* .sunrise-body */
  .sunrise-container {
    z-index: 1000;
  }

  .close-btn {
    position: absolute;
    top: 0.25rem;
    right: 0.5rem;
  }

  .close-btn:hover {
    cursor:  pointer !important;
    transform:scale(1.3,1.3) !important;
    -webkit-transform:scale(1.3,1.3) !important;
    -moz-transform:scale(1.3,1.3) !important;
  }

</style>