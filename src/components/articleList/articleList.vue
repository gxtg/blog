<template>
  <div>
    <div class="article">
      <article class="article-item" v-for="article in articles" :key="article.index">
        <header>
          <h2><router-link class="article-title" :to="{name: 'post', params: {id: article.index}}">{{article.title}}</router-link></h2>
          <h4 class="article-date"><i class="icon-calendar"></i>{{article.time}}<router-link to="/tags">In {{article.tag}}</router-link></h4>
        </header>
        <p class="article-content" v-html="temp(article.index)"></p>
        <footer>
          <router-link :to="{name: 'post', params: {id: article.index}}">... Read more</router-link>
        </footer>
      </article>
    </div>
    <footer class="footer">
      <div>
        <span v-if="pre"><router-link :to="{name: 'article', params: {id: this.$route.params.id - 1}}">上一页</router-link></span>
        <span v-if="next"><router-link :to="{name: 'article', params: {id: this.$route.params.id + 1}}">下一页</router-link></span>
      </div>
    </footer>
  </div>
</template>

<script>
import {article, getArticle} from '../../common/js/article'


export default {
  data() {
    return {
      articles: [],
      next: true,
      pre: true,
      content: []
    }
  },
  created() {
    this.articles = this.getPage()
    getArticle(this.articles).then(results => {
      this.content = results
    })
    this.turnPage()
  },
  watch: {
    '$route' (to, from) {
      this.articles = this.getPage()
      getArticle(this.articles).then(results => {
        this.content = results
      })
      this.turnPage()
    }
  },
  methods: {
    temp(index) {
      return this.content[index]
    },
    getPage() {
      if (this.$route.params.id * 8 > article.length) {
        let start = (this.$route.params.id - 1) * 8
        let end = article.length
        return article.slice(start, end)
      } else {
        let start = (this.$route.params.id - 1) * 8
        let end = this.$route.params.id * 8 - 1
        return article.slice(start, end)
      }
    },
    turnPage() {
      if (this.$route.params.id > 1) {
        this.pre = true
      } else {
        this.pre = false
      }
      if (this.$route.params.id > 1 && this.$route.params.id < article.length / 8) {
        this.next = true
      } else {
        this.next = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl'

  .article
    width 100%
    border-bottom 1px solid rgba(0, 0, 0, .1)
    .article-item 
      width 100%
      height 300px
      header
        height 70px
        .article-title
          color $color-text-d
          font-size 22.5px
          &:hover
            text-decoration underline
        .article-date
          color $color-text-l
          font-size 13px
          padding 18px 0 0 18px
          i
            width 12px
            height 12px
            font-size 12px
            padding-right 10px
          a 
            display inline-block
            margin-left 1em
            padding 0 1em
            border-left 1px solid $color-text-l
            border-right 1px solid $color-text-l
            text-decoration underline
      .article-content
        height 13em
        padding 0 10px
        line-height: 2em;
        color: #333;
        overflow hidden
      footer
        padding 10px 0 0 10px
        a
          color $color-text-l
          font-size 13px
          &:hover
            text-decoration underline
  .footer
    width 100%
    margin 20px auto 
    div
      height 30px
      width 100%
      span
        display block 
        a
          color: #57ad68
          word-break break-all
        .pre
          float left 
        .next
          float right
</style>