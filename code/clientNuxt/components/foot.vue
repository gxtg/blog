<template>
  <footer :class="{'mobile': mobileLayout}">
    <div class="container center">
      <p class="mune">
        <nuxt-link to="/sitemap">归档</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/about">关于</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/about" title="关于里面给了留言方式">留言</nuxt-link>
      </p>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'foot',
  
    computed: {
      mobileLayout () {
        return this.$store.state.options.mobileLayout
      }
    },
  } 
</script>
  
<style scoped lang="scss">

footer {
  margin-top: $normal-pad;
  padding: $normal-pad 0;
  background: $module-bg;
  border-top: 1px solid $border-color;

  >.container {
    display: flex;
    justify-content: space-between;

    &.center {
      justify-content: center;
    }

    > ul,
    > .mune {
      padding: $normal-pad / 2 0;
    }

    > .mune {
      padding: $normal-pad / 2 $normal-pad;
    }
  }

  &.mobile {
    margin-top: 0;
    padding: 0 1rem;

    >.container {
      width: 100%;
    }
  }
}
</style>