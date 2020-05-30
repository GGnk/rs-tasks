<template>
  <div id="app">
    <HeaderComponent/>
    <WrapperComponent/>
  </div>
  <!--<div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input
                type="text"
                class="search-bar"
                placeholder="Search..."
                v-model="query"
                @keypress.enter="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°c</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>

    <v-card
            class="mx-auto"
            max-width="400"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">San Francisco</v-list-item-title>
          <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-3" cols="6">
            23&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sun.png"
                    alt="Sunny image"
                    width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>

      <v-slider
              v-model="time"
              :max="6"
              :tick-labels="labels"
              class="mx-4"
              ticks
      />

      <v-list class="transparent">
        <v-list-item
                v-for="item in forecast"
                :key="item.day"
        >
          <v-list-item-title>{{ item.day }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">
            {{ item.temp }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text>Full Report</v-btn>
      </v-card-actions>
    </v-card>
  </div>-->
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import WrapperComponent from '@/components/WrapperComponent';
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    WrapperComponent
  },
  data () {
    return {

      labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
      time: 0,
      forecast: [
        { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
        { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
        { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
      ],
    }
  },
  computed: {
    ...mapGetters(['getGolocation'])

  },
  created() {
    this.SET_INFO_GEOLOCATION()
  },
  mounted() {
  },
  methods: {
    ...mapActions(['SET_INFO_GEOLOCATION']),

  },
}

</script>

<style>

</style>
