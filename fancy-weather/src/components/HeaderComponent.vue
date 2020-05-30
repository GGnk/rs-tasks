<template>
  <div class="button-cluster"><div class="button-cluster__left-sub-cluster">
    <button class="button button--update" @click="$store.dispatch('SET_INFO_GEOLOCATION')">
      <div class="spinner" style=""></div>
    </button>
    <div class="language-menu">
      <button class="button drop-down-menu__face-button">
        <span>en</span>
        <span class="arrow-down"/>
      </button><div class="drop-down-menu">
      <button class="drop-down-menu__item button" id="en">en</button>
      <button class="drop-down-menu__item button inactive" id="ru">ru</button>
    </div></div>
    <button class="button button--f inactive">°F</button>
    <button class="button button--c">°C</button></div>
    <div class="button-cluster__right-sub-cluster">
      <input class="search-input" type="search" v-model="query" required="" placeholder="Search city">
      <button class="button search-input__button" @click="FETCH_WEATHER">Search</button>
      <button class="search-input__voice-button"/>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'HeaderComponent',
  props: {
  },
  computed: {
    ...mapGetters(['getQuery']),
    query: {
      get () {
        return this.getQuery
      },
      set (value) {
        this.SET_QUERY(value)
      }
    },
  },
  methods: {
    ...mapActions(['FETCH_WEATHER']),
    ...mapMutations(['SET_QUERY'])
  }
}
</script>

<style lang="scss" scoped>

</style>
