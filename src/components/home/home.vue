<template>
  <div class="home">
    <div class="page-wrapper">
      <h1 class="page-title">I am gx</h1>
      <button class="page-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 80 80" data-reactid="89">
          <path fill="#fff" d="M42,11.08v33.1l7.59-7.59a2,2,0,0,1,2.83,2.83l-11,11a2,2,0,0,1-.31.25l-.15.08-.2.1-.2.06-.17.05a2,2,0,0,1-.78,0l-.17-.05-.2-.06-.2-.1-.15-.08a2,2,0,0,1-.31-.25l-11-11a2,2,0,0,1,2.83-2.83L38,44.17V11.08a29,29,0,1,0,4,0Z" data-reactid="90"></path>
        </svg>
      </button>
    </div> 
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl'

  .page-wrapper
    position absolute
    top 0
    left 0
    height 100vh
    width 100vw
    overflow hidden
    background-image url('../../common/img/fj.jpg')
    background-size auto 100%
    .page-title
      position absolute
      top 50%
      left 50%
      width 360px
      height 80px
      line-height 80px
      margin-left -180px
      margin-top -40px
      font-size 80px
      font-weight 800
      color #fff
      text-align center
      @media screen and (max-width: 480px) {
        font-size 40px
      }
    .page-button
      position absolute
      bottom 40px
      left 50%
      width 100px
      height 100px
      margin-left -50px
      background transparent 
      @media screen and (max-width: 480px) {
        bottom 20px
      }
      svg 
        @media screen and (max-width: 480px) {
          width 45px
          height 45px
      }  
</style>
