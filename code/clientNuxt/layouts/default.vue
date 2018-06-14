<template>
  <div class="app">
    <div 
      class="app-aside"
      v-if="mobileLayout" 
      :class="{'open': mobileSidebar}"
      v-click-outside="close">
      <mobile-aside></mobile-aside>
    </div>
    <div class="app-main" :class="{'open': mobileSidebar}">
      <transition name="fade">
        <mobile-header v-if="mobileLayout"></mobile-header>
        <my-header v-else></my-header>   
      </transition>
      <transition-group 
        tag="div" 
        class="container clearfix" 
        :class="{'mobile': mobileLayout}"
        name="slide-up" >
        <div
          class="content-left"
          key="1"
          :class="{'mobile-layout': mobileLayout}">
          <nuxt></nuxt>
        </div>
      </transition-group>
      <transition name="fade">
        <my-footer></my-footer>        
      </transition>
    </div>
    <scoll-top></scoll-top>
  </div>
</template>
  
  
  <script>
  
  import myFooter from '~/components/foot'
  import myHeader from '~/components/head'
  import mobileHeader from '~/components/mobile/head'
  import mobileAside from '~/components/mobile/aside'
  import scollTop from '~/components/common/scollTop'
  
  export default {
    head () {
      return !this.mobileLayout ? {} : {
        bodyAttrs: {
          class: 'mobile' 
        }
      }
    },
  
    components: {
      myFooter,
      myHeader,
      mobileHeader,
      mobileAside,
      scollTop
    },
  
    computed: {
      // 侧边栏
      // isAsdiePage () {
      //   return this.$store.state.options.isAsidePage
      // },
  
      // isWelcome () {
      //   return this.$store.state.options.isWelcome
      // },
      mobileLayout () {
        return this.$store.state.options.mobileLayout
      },
  
      mobileSidebar () {
        return this.$store.state.options.mobileSidebar
      },
  
      isError () {
        return this.$store.state.options.isError
      }
    },
  
    methods: {
      close () {
        this.$store.commit('options/SET_MOBILE_SIDEBAR', false)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  .app {
    >.app-aside {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      height: 100%;
      width: 60%;
      background: $white;
      @include css3-prefix('transform', 'translateX(-100%)');
      @include transition(all .3s ease-out);
  
      >.mobile-aside {
        opacity: 0;
        @include transition(all .3s ease-out);
        @include css3-prefix('transform', 'scale(.8)');
      }
    }
  
    >.app-aside.open {
      @include css3-prefix('transform', 'translateX(0)');
  
      >.mobile-aside {
        opacity: 1;
        @include css3-prefix('transform', 'scale(1)');
      }
    }
  
    >.app-main {
      @include transition(all .3s ease-out);
  
      >.container {
        min-height: calc(100vh - 156px);
        margin-top: $normal-pad;
      }
  
      >.container.mobile {
        min-height: calc(100vh - 56px);
      }
    }
  
    >.app-main.open {
      transform: translateX(60%);
    }
  }
  
  .content-left {
    position: relative;
    width: $container-left;
    float: left;
    @include css3-prefix(transition, all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0));
  }
  
  .content-left.full-page,
  .content-left.mobile-layout {
    width: 100%;
    @include css3-prefix(transition, width .5s cubic-bezier(1.0, 0.5, 0.8, 1.0));
  }
  
  .content-left.mobile-layout {
    width: 100%;
    margin: 0;
    padding: 1rem;
    padding-top: 4.5rem;
  }
  
  .content-right {
    width: $container-right;
    float: right;
  }
  
  .mobile {
    width: 100%;
  }
  </style>
