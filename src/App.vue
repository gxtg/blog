<template>
  <div id="app">
    <m-header></m-header>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'

export default {
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" scoped>

  .main
    box-sizing border-box
    margin 0 auto  
    @media screen and (min-width: 350px) {
      width 100%
      padding 20px
    }
    @media screen and (min-width: 750px) {
      width 100%
      padding 25px
    }
    @media screen and (min-width: 1190px) {
      max-width 70%
      min-width 800px
      padding 35px
    }
</style>
