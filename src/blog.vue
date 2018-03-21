<template>
  <div id="blog">
    <b-header></b-header>
    <div class="main">
      <router-view></router-view>
    </div>
    <b-footer class="b-footer"></b-footer>
  </div>
</template>

<script>
import BHeader from './components/b-header/b-header'
import BFooter from './components/b-footer/b-footer'

export default {
  components: {
    BHeader,
    BFooter
  }
}

</script>

<style lang="stylus" scoped>

  #blog
    box-sizing border-box
    position relative
    min-height 100vh
    padding-bottom 64px

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
      width 1000px
      padding 35px
    }
  .b-footer
    position absolute
    bottom 14px
    width 100%
    height 50px
</style>
