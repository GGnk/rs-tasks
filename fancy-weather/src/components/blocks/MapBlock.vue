<template>
  <div class="map-cluster">
    <div class="map-cluster__map">
      <iframe class="map-iframe"
              v-if="getGeolocation"
              :src="`https://www.google.com/maps/embed/v1/view?center=${getGeolocation.geometry.lat},${getGeolocation.geometry.lng}&amp;zoom=10&amp;key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&amp;language=en`"></iframe>
    </div>
    <div class="map-cluster__coordinates"><p>Latitude: {{getGeolocation? getGeolocation.geometry.lat.toFixed(2): ''}}</p>
      <p>Longitude: {{getGeolocation? getGeolocation.geometry.lat.toFixed(2): ''}}</p></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Map',
  props: {
  },
  computed: {
    ...mapGetters(['getWeather', 'getGeolocation', 'getDate', 'getListDays']),
  }
}
</script>

<style lang="scss" scoped>

</style>
