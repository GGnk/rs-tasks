<template>
  <div class="weather-data-cluster">
    <p class="weather-data-cluster__location">
      {{!getGeolocation?'':getGeolocation.components.city+', '+getGeolocation.components.country}}
    </p>
    <p class="weather-data-cluster__date-time">{{getDate}}</p>
    <p class="weather-data-cluster__temperature-today">
      {{!getWeather?'':getWeather.currently.temperature.toFixed()}}
    </p>
    <span id="icon">
      <img v-if="getWeather" class="weather-data-cluster__weather-icon" :alt="getWeather.currently.summary" :src="'img/'+getWeather.currently.icon+'.png'"/>
    </span>

    <div class="weather-data-cluster__weather-data"><p v-if="getWeather">{{getWeather.currently.summary}}</p>
      <p>Feels Like: {{getWeather?getWeather.currently.temperature.toFixed(1) + "&deg;C":''}}</p>
      <p>Wind: {{getWeather?Math.ceil(getWeather.currently.windSpeed) + " m/s":''}}</p>
      <p>Humidity: {{getWeather?(getWeather.currently.humidity*100).toFixed() + " %":''}}</p>
    </div>

    <div class="forecast"  v-for="(item, i) in getListDays" :key="i" >
      <p class="forecast__day">{{item.day}}</p>
      <p class="forecast__temperature">{{Math.ceil(item.apparentTemperatureHigh)}}°</p>
      <img class="forecast__icon" alt="partly-cloudy-day" :src="'img/'+item.icon+'.png'">
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'Info',
  props: {
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['getWeather', 'getGeolocation', 'getDate', 'getListDays']),
  },
  mounted(){
  },
  updated(){

  },
  methods:{
    ...mapMutations(['GET_ICON']),
    icon() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
