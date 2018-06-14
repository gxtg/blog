<template>
  <div class="mobile-aside">
    <div class="user-head">
      <img :src="user.gravatar"/>
      <p>{{ user.name }}</p>
    </div>
      <nav>
        <li
        v-for="(list, index) in nav"
        :key="index"
        class="nav-list "
        >
          <nuxt-link
            :to="list.path"
            exact>
              <span>{{ list.name }}</span>
          </nuxt-link>
        </li>
      </nav>
      <div class="aside-foot">
        <p class="mune">
          <nuxt-link to="/sitemap">归档</nuxt-link>
          <span class="hr"></span>
          <nuxt-link to="/about">关于</nuxt-link>
          <span class="hr"></span>
          <nuxt-link to="/about">留言</nuxt-link>
        </p>
      </div>
  </div>
</template>
  
<script>
export default {
  name: 'mobile-aside',
  data () {
    return {
      nav: [
        { path: '/code', name: '说术'},
        { path: '/essay', name: '说酒'},
        { path: '/share', name: '说歌'}
      ]
    }
  },

  computed: {
    user () {
      return this.$store.state.options.adminInfo
    }
  }
}
</script>
  
<style scoped lang="scss">
 
.mobile-aside {
  position: relative;
  height: 100%;

  >.user-head {
    padding: 3.5rem 1rem 1rem 1rem;
    text-align: center;

    >img {
      border-radius: 50%;
      width: 8rem;
    }

    >p {
      margin-top: $mlg-pad;
      color: $black;
      font-size: 1.6rem;
    }
  }
  > nav {
    margin-top: $mlg-pad;
    .nav-list {
      padding: 1rem;
      text-align: center;
    }
    a {
      margin-right: 0rem;
      padding: .5rem;
      /* color: $disabled; */

      i {
        margin-right: .8rem;
      }

      &:hover {
        color: $black;
      }
    }

    a.link-active {
      color: $black;
    }
  }

  > .aside-foot {
    position: absolute;
    bottom: $mlg-pad;
    left: 50%;
    width: 100%;
    font-size: $font-size-small;
    color: $disabled;
    text-align: center;
    transform: translate(-50%);
  }
}

</style>