<template>
  <div v-if="getLoader" class="weather-data-cluster">
    <p class="weather-data-cluster__location">
      {{!getGeolocation?'': (getGeolocation.components.city || getGeolocation.components.town || getGeolocation.components.state || getGeolocation.components.continent )+', '+getGeolocation.components.country}}
    </p>
    <p class="weather-data-cluster__date-time">{{this.currentTime}}</p>
    <p class="weather-data-cluster__temperature-today">
      {{!getWeather?'':getWeather[0].temp.toFixed()}}
    </p>
    <span id="icon">
      <img v-if="getWeather" class="weather-data-cluster__weather-icon" :src="'https://www.weatherbit.io/static/img/icons/'+getWeather[0].weather.icon+'.png'"/>
    </span>

    <div class="weather-data-cluster__weather-data"><p v-if="getWeather">{{getWeather[0].weather.description}}</p>
      <p>{{ $t('feelsLike') }}: {{getWeather?getWeather[0].dewpt.toFixed(1) + "&deg;C":''}}</p>
      <p>{{ $t('wind') }}: {{getWeather?Math.ceil(getWeather[0].wind_spd) + (getSetting.units === 'M' ? ' M/S':' MPH'):''}}</p>
      <p>{{ $t('humidity') }}: {{getWeather?(getWeather[0].rh).toFixed() + "%":''}}</p>
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

export default {
  name: 'Info',
  props: {
  },
  data () {
    return {
      currentTime: ''
    }
  },
  computed: {
    ...mapGetters(['getWeather', 'getGeolocation','getListDays', 'getLoader', 'getSetting']),
  },
  mounted(){
  },
  updated(){

  },
  created() {
    setInterval(() => this.getDate(), 1000)
  },
  methods:{
    ...mapMutations(['GET_ICON']),
    getDate() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      let h = Math.abs(d.getHours() - (Math.abs(new Date().getTimezoneOffset() / 60) - (this.getGeolocation? this.getGeolocation.annotations.timezone.offset_sec / 60 / 60 : 0)));
      let m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      let s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
      this.currentTime =`${day} ${date} ${month} ${year} ${h}:${m}:${s}`
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
