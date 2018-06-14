<template>
  <div style="height:100%" id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="stylus" scoped>
  .main
    margin-left 70px
    height 100vh
  .fade-transition
    transition: opacity .2s ease
  .fade-enter, .fade-leave
    opacity: 0;
</style>

