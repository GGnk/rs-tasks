<template>
  <div id="app">
    <HeaderComponent/>
    <WrapperComponent/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import WrapperComponent from '@/components/WrapperComponent';
import {mapActions, mapGetters, mapMutations} from "vuex";

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
    this.GET_LOCALSTORAGE()
    this.SET_INFO_GEOLOCATION()
  },
  mounted() {
    this.GET_DEFAULT_CITY()
  },
  methods: {
    ...mapMutations(['GET_LOCALSTORAGE']),
    ...mapActions(['SET_INFO_GEOLOCATION', 'GET_DEFAULT_CITY']),

  },
}

</script>

