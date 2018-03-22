： <template>
  <div>
    <div class="header">
      <div class="header-container">
        <div class="header-logo">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
            <path d="M417.9 829.4V630.2l136.4 40.3-136.4 158.9z" fill="#7ABDC5"></path>
            <path d="M158 537.6L373.3 621l366.2-312.7-280 312.7 280 83.4 107.7-521.1L158 537.6z m557.2 123.3l-167.9-50 4.9-16.5L702.1 639l59.2-286.5 16.9 3.5-63 304.9z"
              fill="#FE595B"></path>
          </svg>
          <svg height="30" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="50 50.01 685.14 129.44">
            <polygon fill="#FE595B" points="156.13,50.01 170.78,96.02 195.48,63.62 "></polygon>
            <path class="logo-body" fill="#444" d="M111.68,63.55h26v113.63h-26v-45.13H76v45.12H50V63.55h26v43.5h35.71L111.68,63.55z"
              data-reactid="11"></path>
            <path class="logo-body" fill="#444" d="M158.75,177.18v-71.1h24.35v71.1H158.75z"></path>
          </svg>
        </div>
        <ul class="header-nav">
          <li class="header-nav-item">
            <router-link class="home" to="/home">home</router-link>
          </li>
          <li class="header-nav-item">
            <a href="blog.html">blog</a>
          </li>
          <li class="header-nav-item">
            <router-link class="about" to="/about">about</router-link>
          </li>
          <li class="header-nav-item">
            <router-link class="contract" to="/contract">contract</router-link>
          </li>
        </ul>
        <span class="nav-icon" @click="asideNavShow = !asideNavShow">
          <svg viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28">
            <line x1="13" y1="24" x2="67" y2="24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line>
            <line x1="19" y1="40" x2="57" y2="40" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line>
            <line x1="24" y1="56" x2="48" y2="56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line>
          </svg>
        </span>
      </div>
    </div>
    <div class="header-nav-mask" :class="[asideNavShow? 'open' : '']" @click="asideNavShow = false">
      <ul class="nav-aside-list">
        <li class="header-nav-item">
          <router-link class="home" to="/home">home</router-link>
        </li>
        <li class="header-nav-item">
          <a href="blog.html">blog</a>
        </li>
        <li class="header-nav-item">
          <router-link class="about" to="/about">about</router-link>
        </li>
        <li class="header-nav-item">
          <router-link class="contract" to="/contract">contract</router-link>
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

<style lang="stylus">
  @import '../../common/stylus/variable.styl'

  .header 
    position relative
    top 0 
    right 0 
    left 0
    z-index 100 
    background transparent 
    box-shadow 0 0 4px rgba(0, 0, 0, .25) 
    .header-container
      height $header-height
      margin 0 auto
      padding $header-padding 0
      @media screen and (mix-width: 350px) {
        width 100%
        padding 6px 0 18px 0
      }
      @media screen and (min-width: 410px){
        width 100%
        padding 7px 0 19px 0
      }
      @media screen and (min-width: 750px){
        width 100%
        padding 20px
      }
      @media screen and (min-width: 1190px){
        max-width 70%
        min-width 1000px
      }
      .header-logo
        display inline-block
        @media screen and (max-width: 480px) {
          maigin-left 10px
        }
      .header-nav
        float right
        @media screen and (max-width: 480px) {
          display none
        }
        .header-nav-item
          display inline-block
          margin 10px 15px 0 15px
      .nav-icon
        display inline-block
        position absolute
        top 25px
        right 10px 
        width 28px
        height 28px
        @media screen and (min-width: 480px) {
          display none 
        }

  .header-nav-item
    a
      line-height 30px
      padding-bottom 3px
      font-size $font-size-medium-x
      color $color-text
      font-weight 500
      &:hover, &.active
        border-bottom 1.2px solid #7ABDC5
        color #7ABDC5

  .header-nav-mask
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
    .nav-aside-list
      display block 
      position absolute
      top 0
      right 0
      bottom 0
      width 200px
      padding ($header-padding-s * 2 + $header-height + 10px) 0 0 20px
      background $color-background-l
      box-shadow 0 0 4px rgba(0, 0, 0, .25)
      .header-nav-item
        display block 
</style>
