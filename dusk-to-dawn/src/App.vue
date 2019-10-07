<template>
  <div id="app">
    <app-nav-bar></app-nav-bar>
    <map-view></map-view>
  </div>
</template>

<script>
import AppNavBar from './components/AppNavBar';
import MapView from './views/MapView';

export default {
  name: 'app',
  components: {
    AppNavBar,
    MapView
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
