import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import i18n from "../i18n";

Vue.use(Vuex)

function getDay(plus) {
  let d = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  d.setDate(d.getDate()+plus);
  let day = days[d.getDay()];
  return i18n.t('days.'+day)
}

export default new Vuex.Store({
  state: {
    api_weather: {
      api_key: 'b0e657500509463fa174877839214ffc',
      url_base: 'https://api.weatherbit.io/v2.0/forecast/daily',
    },
    api_geo: {
      api_key: '580e18282ca247d6bdc6e69f45ae0bb6',
      url_base: 'https://api.opencagedata.com/geocode/v1/',
    },
    geolocation: null,
    query: null,
    weather: null,
    loader: false,
    error: '',
    setting: {
      units: 'M',
      lang: 'en',
      locales: ['en', 'ru', 'be']
    }
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
        return state.weather.filter((item, i) => i>0 && i < 4 ? item['day'] = getDay(i): false)
      }
    },
    getQuery(state) {
      return state.query
    },
    getlocation(state) {
      return state.geolocation
    },
    getDegMinLat(state) {
      if (state.geolocation) {
        let degree = parseInt(state.geolocation.geometry.lat)
        let minutes = Math.abs(parseInt((state.geolocation.geometry.lat - degree) * 60))
        return `${degree}°${minutes < 10 ? '0' + minutes : minutes}'`
      }
    },
    getDegMinLng(state) {
      if (state.geolocation) {
        let degree = parseInt(state.geolocation.geometry.lng)
        let minutes = Math.abs(parseInt((state.geolocation.geometry.lng - degree) * 60))
        return `${degree}°${minutes < 10 ? '0' + minutes : minutes}'`
      }
    },
    getLoader(state) {
      return state.loader
    },
    getSetting(state) {
      return state.setting
    }
  },
  mutations: {
    SET_WEATHER (state, results) {
      state.weather = results
    },
    SET_GEOLOCATION (state, results) {
      state.geolocation = results
    },
    SET_QUERY (state, results) {
      state.query = results
    },
    /**
     * @return {boolean}
     */
    ALERT_HANDLER (state, payload) {
      Vue.notify({
        group: payload.type,
        type: payload.type,
        duration: 10000,
        title: payload.title,
        text: payload.text
      });
      state.error = payload.text
    },
    GET_LOCALSTORAGE(state) {
      if (localStorage.getItem('option')) {
        state.setting = JSON.parse(localStorage.getItem('option'))
        i18n.locale = state.setting.lang
      }
    },
    SET_LOCALSTORAGE(state, payload) {
      state.setting[payload.key] = payload.value
      localStorage.setItem('option', JSON.stringify(state.setting))
    },

  },
  actions: {
    SET_INFO_GEOLOCATION ({commit, dispatch}) {
      window.navigator.geolocation.getCurrentPosition(
          function(geolocation) {
            dispatch('GET_CITY_AND_WEATHER', {geolocation: geolocation})
          },
          (err) => commit('ALERT_HANDLER', {
            text: `${i18n.t('sysErr.SET_INFO_GEOLOCATION.text')}: ${err.message}`,
            title: `${i18n.t('sysErr.SET_INFO_GEOLOCATION.title')}?`,
            type:'warn'})
      )
    },

    GET_CITY_AND_WEATHER ({state, commit, dispatch}, payload) {
      let geolocation = payload.geolocation
      let query = (payload.query || state.query)
      let language = (payload.language || state.setting.lang)
      let fastQuery = (payload.fastQuery || false)
      let q = ''
      if(query) q = query
      else {
        let lat = state.geolocation ? state.geolocation.geometry.lat : geolocation.coords.latitude
        let lng = state.geolocation ? state.geolocation.geometry.lng : geolocation.coords.longitude
        q = `${lat},${lng}`
      }

      axios.get(`${state.api_geo.url_base}json?key=${state.api_geo.api_key}&q=${q}&pretty=1&language=${language}`)
          .then((e) => {
            if(e.data.results.length > 0) {
              commit('SET_GEOLOCATION', e.data.results[0])
              dispatch('GET_WEATHER_COORDINATES', {geolocation: e.data.results[0]})
              state.loader = true
            } else {
              if (!fastQuery) {
                commit('ALERT_HANDLER', {
                  text: `${i18n.t('alert.GET_CITY_AND_WEATHER.text')}`,
                  title: `${i18n.t('alert.GET_CITY_AND_WEATHER.title')}`,
                  type: 'warn'
                })
              }
            }
          })
          .catch((err) => commit('ALERT_HANDLER', {
            text: `${i18n.t('sysErr.UnexpectedCrash.text')}: ${err.message}`,
            title: `${i18n.t('sysErr.UnexpectedCrash.title')}`,
            type:'error'}))

    },
    /**
     * Default
     * lang = en
     * Inits = M (Celcius, m/s, mm)
     */
    GET_WEATHER_COORDINATES ({state, commit}, payload) {
      let crd = payload.geolocation.geometry
      if(crd.length !== 0){
        axios.get(`${state.api_weather.url_base}?lat=${crd.lat}&lon=${crd.lng}&days=4&units=${payload.units || state.setting.units}&lang=${payload.lang || state.setting.lang}&key=${state.api_weather.api_key}`)
            .then((e) => {
              commit('SET_WEATHER', e.data.data)
            })
            .catch((err) => commit('ALERT_HANDLER', {
              text: `${i18n.t('sysErr.UnexpectedCrash.text')}: ${err.message}`,
              title: `${i18n.t('sysErr.UnexpectedCrash.title')}`,
              type:'error'}))
      }
    },
    SEARCH ({state, commit, dispatch}, payload) {
      if (!state.query || state.query.length < 2) {
        return commit('ALERT_HANDLER', {
          text: `${i18n.t('alert.SEARCH.text')}`,
          title: `${i18n.t('alert.SEARCH.title')}`,
          type:'warn'})
      }
      dispatch('GET_CITY_AND_WEATHER', {geolocation: null, fastQuery: payload.fastQuery})
    },
    UPDATE({state, commit, dispatch}) {
      state.query = localStorage.getItem('query')
      dispatch('GET_CITY_AND_WEATHER', {geolocation: null})
      state.query = ''
      commit('ALERT_HANDLER', {
        title: `${i18n.t('alert.UPDATE')}`,
        type:'success'})
    },
    GET_DEGREE({state, commit, dispatch}, unit){
      commit('SET_LOCALSTORAGE', { key: 'units', value: unit})
      dispatch('GET_WEATHER_COORDINATES', { geolocation: state.geolocation, units: state.setting.units})
    },
    GET_DEFAULT_CITY({state, commit, dispatch}) {
      setTimeout(() => {
        if(state.weather == null) {
          state.query = 'Saratov'
          dispatch('GET_CITY_AND_WEATHER', {geolocation: null})
          state.loader = true
          commit('ALERT_HANDLER', {
            title: `${i18n.t('alert.GET_DEFAULT_CITY.title')}`,
            text: `${i18n.t('alert.GET_DEFAULT_CITY.text')} :)`,
            type: 'success'
          })
        }
      }, 5000)
    },
    SET_LOCALES({state, commit, dispatch}, loc) {
      i18n.locale = loc
      commit('SET_LOCALSTORAGE', {key: 'lang', value: loc})
      dispatch('GET_CITY_AND_WEATHER', {geolocation: state.geolocation, language: loc})
    }
  }
})
