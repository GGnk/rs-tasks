import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function getDay(plus) {
  let d = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  d.setDate(d.getDate()+plus);
  let day = days[d.getDay()];
  return `${day}`
}

export default new Vuex.Store({
  state: {
    api_weather: {
      api_key: '43ca44b17c4017837e555b7a2fddd02d',
      url_base: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/',
      url_icon: 'https://openweathermap.org/img/w/',
    },
    api_geo: {
      api_key: '580e18282ca247d6bdc6e69f45ae0bb6',
      url_base: 'https://api.opencagedata.com/geocode/v1/',
    },
    geolocation: null,
    query: '',
    weather: null,

  },
  getters: {
    getWeather(state) {
      return state.weather
    },
    getGeolocation(state) {
      return state.geolocation
    },
    getListDays(state) {
      if (state.weather){
        return state.weather.daily.data.filter((item, i) => i < 3 ? item['day'] = getDay(++i): false)
      }
    },
    getQuery(state) {
      return state.query
    },
    getDate() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      let h = d.getHours();
      let m = d.getMinutes();

      return `${day} ${date} ${month} ${year} ${h}:${m}`
    },
    getlocation(state) {
      return state.geolocation
    },
  },
  mutations: {
    SET_WEATHER (state, results) {
      state.weather = results
      console.log(state.weather)
    },
    SET_GEOLOCATION (state, results) {
      state.geolocation = results
      console.log(state.geolocation)
    },
    SET_QUERY (state, results) {
      state.query = results
    },
  },
  actions: {
    //TODO: переделать
    FETCH_WEATHER ({state, commit}) {
      fetch(`${state.url_base}forecast?q=${state.query}&appid=${state.api_key}`)
          .then(res => {
            return res.json();
          })
          .then((e) => commit('SET_WEATHER', e));
    },
    GET_GEOLOCATION ({state, commit}, geolocation, language = 'en') {
      let crd = geolocation.coords
      axios.get(`${state.api_geo.url_base}json?key=${state.api_geo.api_key}&q=${crd.latitude},${crd.longitude}&pretty=1&no_annotations=1&language=${language}`)
          .then((e) => {
            commit('SET_GEOLOCATION', e.data.results[0])
          })
          .catch((err) => {
            console.log(err)
          })
    },
    SET_INFO_GEOLOCATION ({dispatch}) {
      window.navigator.geolocation.getCurrentPosition(
          function(geolocation) {
            dispatch('GET_GEOLOCATION', geolocation)
            dispatch('GET_WEATHER_COORDINATES', geolocation)
          },
            (error) => console.warn(error.message),
      )
    },
    GET_WEATHER_COORDINATES ({state, commit}, geolocation, units = 'si') {
      let crd = geolocation.coords
      console.log(crd)
      if(crd.length !== 0){
        axios.get(`${state.api_weather.url_base}${state.api_weather.api_key}/${crd.latitude},${crd.longitude}?lang=en&units=${units}`)
            .then((e) => {
              commit('SET_WEATHER', e.data)
            })
            .catch((err) => {
              console.log(err)
            })
      }

    }
  },
  modules: {
  }
})
