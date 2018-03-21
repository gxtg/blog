<template>
  <div>
    <div class="b-header">
      <div class="b-header-container">
        <h1 class="b-header-title">南城</h1>
        <ul class="b-header-nav">
          <li class="nav-item">
            <i class="icon-article"></i> 
            <router-link :to="{name: 'article', params: {id: 1}}">文章</router-link>
          </li>
          <li class="nav-item">
            <i class="icon-book"></i> 
            <router-link to="/tags">标签</router-link>
          </li>
          <li class="nav-item">
            <i class="icon-folder"></i> 
            <router-link to="/works">作品</router-link>
          </li>
          <li class="nav-item">
            <i class="icon-user"></i> 
            <router-link to="/about">关于</router-link>
          </li>
        </ul>
        <span class="b-nav-icon" @click="asideNavShow = !asideNavShow">
            <svg viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30">
              <line x1="13" y1="24" x2="67" y2="24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line>
              <line x1="19" y1="40" x2="57" y2="40" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line>
              <line x1="24" y1="56" x2="48" y2="56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line>
            </svg>
        </span>
      </div>
    </div>
    <div class="b-header-mask" :class="[asideNavShow? 'open' : '']" @click="asideNavShow = false">
      <ul class="b-mask-aside">
        <li class="nav-item">
          <i class="icon-article"></i> 
          <router-link :to="{name: 'article', params: {id: 1}}">文章</router-link>
        </li>
        <li class="nav-item">
          <i class="icon-book"></i> 
          <router-link to="/tags">标签</router-link>
        </li>
        <li class="nav-item">
          <i class="icon-folder"></i> 
          <router-link to="/works">作品</router-link>
        </li>
        <li class="nav-item">
          <i class="icon-user"></i> 
          <router-link to="/about">关于</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      asideNavShow: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl'
  
  .b-header
    position relative
    z-index 199
    width 100%
    background-color #fff
    box-shadow 0 0 4px rgba(0, 0, 0, .25)
    .b-header-container
      box-sizing border-box
      width 1000px
      margin 0 auto
      padding $header-padding 0
      @media screen and (min-width: 350px){
        padding 6px 0
        width 100%
      }
      @media screen and (min-width: 410px){
        padding 7px 0
      }
      @media screen and (min-width: 750px){
        padding $header-padding 30px
        width 100%
      }
      @media screen and (min-width: 1190px){
        padding $header-padding 0
        width 1000px
      }
      .b-header-title
        height $header-height
        line-height $header-height
        font-size $font-size-large
        color $color-text
        font-weight 600
        @media screen and (max-width: 780px) {
          font-size $font-size-large
          text-align center 
        }
      .b-header-nav
        float right 
        width 40%
        height $header-padding
        @media screen and (max-width: 780px) {
          display none 
        }
        .nav-item
          display inline-block
          width 23.5%
          height 15px
          line-height 15px
          border-right 1px solid $color-text-l
          text-align center
      .b-nav-icon
        display inline-block
        position absolute
        width 30px
        height 30px
        @media screen and (min-width: 780px) {
          display none 
        }
        @media screen and (min-width: 360px){
          top 8px
          right 10px 
        }
        @media screen and (min-width: 480px) {
          top 25px
          right 25px
        }
  .nav-item
    i
      width 13px
      height 13px
      font-size 13px
    a
      font-size 16px
      color $color-text-l
      &:hover, &.active
        color $color-text-d

  .b-header-mask
    position fixed
    z-index 99
    left 100%
    right -100%
    top 0
    bottom 0
    background transparent 
    transition right .2s ease
    &.open
      left 0
      right 0
    .b-mask-aside
      display block 
      position absolute
      top 0
      right 0
      bottom 0
      padding $header-height+18 0 0 20px
      background #f9f9f9
      box-shadow 0 0 4px rgba(0, 0, 0, .25)
      @media screen and (min-width: 360px){
        width 120px
        padding 60px 0 0 20px
      }
      @media screen and (min-width: 480px) {
        width 240px
        padding 100px 0 0 20px
      }
      .nav-item
        display block
        height 30px
        line-height 30px  
</style>
