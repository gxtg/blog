<template>
    <div class="about" :class="{'mobile': mobileLayout}">
      <div class="title" >
        <span class="title-name">关于我</span>
        <span class="line"></span>
      </div>
      <div class="info-box" :class="{'info-mobile': mobileLayout}">
        <div class="info ">
          <div class="list">
            <i class="icon-user"></i>
            <span class="list-content">{{ user.name }}(gx)</span>
          </div>
          <div class="list">
            <i class="icon-heart_f"></i>
            <span class="list-content">先留个位置</span>
          </div>
          <div class="list">
            <i class="icon-message"></i>
            <span class="list-content icons">
              <a href="https://github.com/gxtg" target="_blank"><i class="icon-github"></i></a>
              <a href="mailto:876253884@qq.com" target="_blank"><i class="icon-email"></i></a>
              <a
              href="javascript:;" 
              class="wechat"
              @mouseover="showBox = true"
              @mouseleave="showBox = false"><i class="icon-wechat"></i></a>
            </span>
            <transition name="fade">
              <div 
              class="wechat-box" 
              v-show="showBox"
              @mouseover="showBox = true"
              @mouseleave="showBox = false">
                <img src="~static/image/wexin.png" alt="code" width="150px">
                <span class="arrow"></span>
              </div>
            </transition>
          </div>
        </div>
        <div class="user-box">
          <div class="user">
            <img :src="user.gravatar" alt="" width="100%">
          </div>
        </div>
      </div>
  
      <p class="title more" :class="{'title-mobile': mobileLayout}">
        <span class="title-name">More</span>
        <span class="line"></span>
      </p>
      <div class="text-box ">
        <div class="text">
          <p>{{ user.sologan }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
  
    name: 'about',
  
    transition: 'fade',
  
    head: {
      title: 'About'
    },
  
    data () {
      return {
        showBox:  false
      }
    },
  
    computed: {
      mobileLayout () {
        return this.$store.state.options.mobileLayout
      },
  
      user () {
        return this.$store.state.options.adminInfo
      }
    },
  }
  
  </script>
  
  <style scoped lang="scss">
  
  .about {
    width: $container-min-width;
    margin: 2rem auto 0 auto;
  
    >.title {
      position: relative;
      padding: 0.5rem 0rem;
      line-height: 1.5rem;
      color: $black;
      font-size: 1rem;
      font-weight: normal;
  
      > .title-name {
        position: relative;
        padding-right: $lg-pad;
        background: $white;
        z-index: 99;      
      }
  
      > .line {
        top: 50%;
      }
    }
  
    >.title.more {
      margin-top: 2rem;
    }
  
    >.title-mobile {
      margin-top: 0;
    }
  
    >.last {
      padding: 2rem;
      border: 0;
  
      p {
        margin: .5rem 0;
      }
  
      a {
        text-decoration: underline;
      }
    }
  
    >.info-box {
      display: flex;
      justify-content: space-between;
  
      >.info {
        position: relative;
        width: calc(100% - 16rem - 1rem);
        padding: $normal-pad 0;
  
        >.list {
          display: flex;
          margin: .5rem;
          padding: 0 1rem;
          height: 36px;
          line-height: 36px;
  
          i {
            height: 36px;
            line-height: 36px;
            color: $dividers;
          }
  
          >.list-content {
            margin-left: 1rem;
          }
  
  
          span.icons {
            display: flex;
  
            a {
              margin-right: 1rem;
            }
  
            i {
              color: $black-light;
              @include transition(all .5s);
  
              &:hover {
                font-size: 1.3rem;
                color: $black;
              }
            }
          }
  
          >.wechat-box {
            position: absolute;
            right: 11rem;
            bottom: -10rem;
            padding: .5rem;
            background: lighten($module-hover-bg, 30%);
  
            >.arrow {
              position: absolute;
              display: inline-block;
              width: 0;
              height: 0;
              border-width: 7px;
              border-style: dashed dashed solid;
              border-color: transparent transparent lighten($module-hover-bg, 30%);
              overflow: hidden;
              font-size: 0;
              line-height: 0;
              vertical-align: top;
              top: -14px;
              left: calc(50% - 3.5px);
            }
          }
        }
      }
  
      >.user-box {
        width: 16rem;
        padding-right: 2rem;
  
        .user {
          padding: 1rem;
          overflow: hidden;
  
          img {
            max-width: 100%;
            @include border-radius(4px);
          }
        }
      }
    }
  
    &.mobile {
      width: 100%;
      transform: translate(0);
  
      >.info-box {
        // grid-template-columns: 100%;
        width: 100%;
        flex-direction: column-reverse;
  
        >.info {
          padding: 1rem;
          width: 100%;
  
          >.list {
            padding: 0;
            // grid-gap: 1rem;
            @include text-overflow();
  
  
            >.wechat-box {
              right: 2.6rem;
            }
          }
        }
        >.user-box {
          // grid-row: 1 / 2;
          width: 100%;
          padding-right: 0;
  
          >.user {
            padding: 1.5rem;
          }
        }
      }
      .text-box .text {
        padding: 1.5rem;
        text-align: left;
      }
    }
  
    >.text-box {
      margin-top: 1rem;
  
      >.text {
        padding: 3rem;
        height: 20rem;
        line-height: 2rem;
        text-align: center;
      }
    }
  }
  
  </style>
