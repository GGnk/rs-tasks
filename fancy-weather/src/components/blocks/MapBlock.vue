<template>
  <div v-if="getLoader" class="map-cluster">
    <div class="map-cluster__map">
      <iframe class="map-iframe"
              v-if="getGeolocation"
              :src="`https://www.google.com/maps/embed/v1/view?center=${getGeolocation.geometry.lat},${getGeolocation.geometry.lng}&amp;zoom=10&amp;key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&amp;language=${getSetting.lang}`"></iframe>
    </div>
    <div class="map-cluster__coordinates"><p>{{ $t('latitude') }}: {{getDegMinLat}}</p>
      <p>{{ $t('longitude') }}: {{getDegMinLng}}</p></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Map',
  props: {
  },
  computed: {
    ...mapGetters(['getWeather', 'getGeolocation', 'getDate', 'getListDays', 'getDegMinLat', 'getDegMinLng', 'getLoader', 'getSetting']),
  }
}
</script>

<style lang="scss" scoped>

</style>
