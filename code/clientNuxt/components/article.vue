<template>
  <transition-group tag="div" name="slide-down" class="article-box" :class="{'mobile': mobileLayout}">
    <div
      class="article-item"
      v-for="item in articleList"
      :key="item._id"
      :class="{'mobile-article': mobileLayout}">
      <div class="content">
        <div class="title"><nuxt-link :to="`/article/${item._id}`">{{ item.title }}</nuxt-link></div>
        <nuxt-link :to="`/article/${item._id}`" v-if="mobileLayout"></nuxt-link>
        <div class="abstrack markdown-content" v-html="item.excerpt"></div>
        <div class="meta">
          <span class="time">
            {{ item.lastEditTime | dateFormat('yyyy.MM.dd') }}
          </span>
          <span class="hr"></span>
          <span class="read">阅读 {{ item.views }}</span>
          <span class="hr"></span>
          <span class="like">喜欢 {{ item.likes }}</span>
        </div>
      </div>
      <span class="article-line"></span>
    </div>
    <div class="end-article" v-if="!haveMoreArt" key="-1">
      <i>end</i>
    </div>
    <div class="loading-more end-article " v-if="haveMoreArt" key="-2">
      <a href="javascript:;" @click="$emit('loadMore')" v-if="!fetch" class="allow"><i>more</i></a>
      <a href="javascript:;" v-if="fetch" class="not-allow"><i>loading...</i></a>
    </div>
  </transition-group>
</template>

<script>

export default {
  name: 'article-box',

  props: ['articleList', 'haveMoreArt'],

  computed: {
    fetch () {
      return this.$store.state.article.fetch
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  }
}
</script>

<style scoped lang="scss">

.article-box {
  width: $container-left;
  margin: 0 auto;

  >.article-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $lg-pad 0 $normal-pad;
    margin-bottom: $xlg-pad;
    color: $black;

    .title {
      margin-bottom: $sm-pad;
      font-size: 1.3rem;
      font-weight: 600;
    }

    &.mobile-article {

      &:hover {
        background: $module-bg;
      }

      >.content {
        width: 100%;
        margin: 0;

        >a {
          display: block;
          margin-bottom: .5rem;
          width: 100%;
        }

        .meta {      
          color: #969696;
        }

        .mobil-img {
          max-width: 100%;
          max-height: 200px;
        }
      }
    }

    >.content {

      >.title {
        @include content-overflow(1);
      }

      >.abstrack {
        margin: 1.2rem 0;
        min-height: 4rem;
        line-height: 1.8rem;
        color: $descript;
        @include content-overflow(3);
      }

      >.meta {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: $sm-pad;
        height: 1rem;
        line-height: 1rem;
        font-size: $font-size-small;
        color: #969696;
      }
    }

    >a {
      display: block;
      width: 10rem;

      >.pc-thumb {
        width: 100%;
        height: 6rem;
        line-height: 6rem;
        overflow: hidden;
      }
    }

    > .article-line {
      position: absolute;
      left: -$mlg-pad;
      bottom: -$mlg-pad;
      width: $xlg-pad * 2;
      height: 1px;
      background: $border-color;
    }
  }

  .end-article {
    padding: $md-pad 0;
    color: $black;
  }

  &.mobile {
    width: 100%;

    >.end-article {
      margin-bottom: 0;
      padding: 1rem 0;
    }
  }
}

</style>