<template>
  <div>
    <nav-aside></nav-aside>
    <div class="main">
      <router-view
        transition="fade"
        transition-mode="out-in">
      </router-view>
    </div>
  </div>
</template>

<script>
import NavAside from './navAside'

export default {
  components: {
    NavAside
  }
}
</script>

<style lang="stylus" scoped>
  .main
    margin-left 70px
    height 100vh
  .fade-transition
    transition: opacity .2s ease
  .fade-enter, .fade-leave
    opacity: 0;
</style>

