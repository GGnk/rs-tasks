<template>
  <div class="button-cluster">
    <notifications group="warn" position="center"/>
    <notifications group="error" position="bottom left"/>
    <notifications group="success" position="center"/>
    <div class="button-cluster__left-sub-cluster" >
      <button class="button button--update" @click="UPDATE">
        <img height="60%" width="60%" src="img/spinner.svg">
      </button>
      <div class="language-menu">
        <select class="drop-down-list" v-model="lang">
          <option class="opt" v-for="(lang, i) in getSetting.locales" :key="i">{{lang}}</option>
        </select>
      </div>
      <div class="form_toggle" v-if="getLoader">
        <div class="form_toggle-item item-1">
          <input id="fid-1" type="radio" name="radio" :checked="getSetting.units === 'I'">
          <label @click="GET_DEGREE('I')" for="fid-1">°F</label>
        </div>
        <div class="form_toggle-item item-2">
          <input id="fid-2" type="radio" name="radio" :checked="getSetting.units === 'M'">
          <label @click="GET_DEGREE('M')" for="fid-2">°C</label>
        </div>
      </div>
    </div>
    <div class="button-cluster__right-sub-cluster">
      <input class="search-input" type="search" v-model="query" @keyup.enter="SEARCH" :placeholder="$t('searchP')" required>
      <button class="button search-input__button" @click="SEARCH">{{ $t('search')}}</button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapGetters(['getQuery', 'getLoader', 'getSetting']),
    query: {
      get () {
        return this.getQuery
      },
      set (value) {
        this.SET_QUERY(value)
      }
    },
    lang: {
      get () {
        return this.getSetting.lang
      },
      set (loc) {
        this.SET_LOCALES(loc)
      }
    }
  },
  watch: {
    query(q) {
      q.length > 2 ? this.SEARCH({fastQuery: true}): ''
    }
  },
  methods: {
    ...mapActions(['SEARCH', 'UPDATE', 'GET_DEGREE', 'SET_LOCALES']),
    ...mapMutations(['SET_QUERY'])
  }
}
</script>

<style lang="scss" scoped>
  .drop-down-list {
    width: 7.1rem;
    height: 4.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background: rgba(180, 184, 187, 0.7);
    font-family: inherit;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .opt {
    background-color: grey;
  }

  .form_toggle {
    display: inline-block;
    overflow: hidden;
    margin-left: 1rem;
  }
  .form_toggle-item {
    float: left;
    display: block;
  }
  .form_toggle-item input[type=radio] {
    display: none;
  }
  .form_toggle-item label {
    display: inline-block;
    padding: 10%;
    width: 4.4rem;
    height: 4.4rem;
    text-align: center;
    line-height: 34px;
    border: 1px solid #999;
    border-right: none;
    cursor: pointer;
    user-select: none;
  }

  .form_toggle .item-1 label {
    border-radius: 6px 0 0 6px;
  }
  .form_toggle .item-2 label {
    border-radius: 0 6px 6px 0;
    border-right: 1px solid #999;
  }

  /* Checked */
  .form_toggle .item-1 input[type=radio]:checked + label {
    background: mediumvioletred;
  }
  .form_toggle .item-2 input[type=radio]:checked + label {
    background: mediumvioletred;
  }
</style>
