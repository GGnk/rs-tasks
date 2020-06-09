<template>
  <div v-if="getLoader" class="weather-data-cluster">
    <p class="weather-data-cluster__location">
      {{getNameCity}}
    </p>
    <p class="weather-data-cluster__date-time">{{currentTime}}</p>
    <p class="weather-data-cluster__temperature-today">
      {{!getWeather?'':getWeather[0].temp.toFixed()}}
    </p>
    <span id="icon">
      <img v-if="getWeather" class="weather-data-cluster__weather-icon" :src="'https://www.weatherbit.io/static/img/icons/'+getWeather[0].weather.icon+'.png'"/>
    </span>

    <div class="weather-data-cluster__weather-data"><p v-if="getWeather">{{getWeather[0].weather.description}}</p>
      <p>{{ $t('feelsLike') }}: {{getFeelsLike}}</p>
      <p>{{ $t('wind') }}: {{getWind}}</p>
      <p>{{ $t('humidity') }}: {{getHumidity}}</p>
    </div>

    <div class="forecast"  v-for="(item, i) in getListDays" :key="i" >
      <p class="forecast__day">{{item.day}}</p>
      <p class="forecast__temperature">{{Math.ceil(item.temp)}}°</p>
      <img class="forecast__icon" alt="partly-cloudy-day" :src="'https://www.weatherbit.io/static/img/icons/'+item.weather.icon+'.png'">
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";
  import CurrentTime from "./mixins"

export default {
  name: 'Info',
  mixins: [CurrentTime],

  computed: {
    ...mapGetters(['getWeather', 'getGeolocation','getListDays', 'getLoader', 'getSetting']),
    getNameCity() {
      return !this.getGeolocation?'': (this.getGeolocation.components.city || this.getGeolocation.components.town
              || this.getGeolocation.components.state || this.getGeolocation.components.continent)+', '+ this.getGeolocation.components.country
    },
    getFeelsLike() {
      return this.getWeather?this.getWeather[0].dewpt.toFixed(1) + "&deg;C":''
    },
    getWind() {
      return this.getWeather?Math.ceil(this.getWeather[0].wind_spd) + (this.getSetting.units === 'M' ? ' M/S':' MPH'):''
    },
    getHumidity() {
      return this.getWeather?(this.getWeather[0].rh).toFixed() + "%":''
    }
  },
  methods:{
    ...mapMutations(['GET_ICON'])
  }
}
</script>

