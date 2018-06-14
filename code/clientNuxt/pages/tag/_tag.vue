<template>
  <div class="tag">
    <p class="title">
      <span class="title-name"><i class="icon-link"></i> {{ tag.name }} </span>
      <span class="line"></span>
    </p>
    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </div>
</template>
<script>

import articleView from '~/components/article'

export default {

  name: 'tag',

  transition: 'fade',

  scrollToTop: true,

  fetch ({ store, params }) {
    return store.dispatch('getArtList', {tag: params.tag})
  },

  head () {
    return { title: `${this.tag.name} | tag` }
  },

  data () {
    return {}
  },

  components: {
    articleView
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    tag () {
      const _id = this.$route.params.tag
      return this.$store.state.tag.data.find(item => item._id === _id)
    },

    list () {
      return this.$store.state.article.art.list
    },

    haveMoreArt () {
      return this.$store.state.article.art.pagination.cur_page
              !== this.$store.state.article.art.pagination.total_page
    }
  },

  methods: {
    loadMore () {
      let offset = this.$store.state.article.art.pagination.cur_page * 8
      this.$store.dispatch('getMoreArt', {
        tag: this.$route.params.tag,
        offset: offset
      })
    }
  }
}
</script>

<style scoped lang="scss">

.tag > .title {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0rem;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: normal;

  i {
    margin-right: .5rem;
  }

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
</style>