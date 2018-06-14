<template>
  <section  class="clearfix article"> 
    <articleView
      :articleList = "list"
      :haveMoreArt="haveMoreArt"
      @loadMore="loadMore"></articleView>
  </section>
</template>

<script>
  
import articleView from '~/components/article'

export default {

  scrollToTop: true,

  transition: 'fade',

  fetch ({ store }) {
    return store.dispatch('getArtList', {tag: '术', offset: 0})
    
  },
  
  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    list () {
      return this.$store.state.article.art.list
    },

    haveMoreArt () {
      return this.$store.state.article.art.pagination.cur_page
              !== this.$store.state.article.art.pagination.total_page
    }
  },
  components: {
    articleView
  },
  methods: {
    loadMore () {
      let offset = this.$store.state.article.art.pagination.cur_page * 8
      this.$store.dispatch('getMoreArt', {
        tag: '术',
        offset: offset
      })
    }
  }
}
</script>
  
  
<style lang="scss">

.main {
  >.title {
    position: relative;
    display: flex;
    justify-content: space-between;
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
}

</style>