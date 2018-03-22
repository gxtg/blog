<template>
  <div>
    <article class="post">
      <header>
        <h2 class="post-title">{{post.title}}</h2>
        <h4 class="post-date">Posted on {{post.time}}<router-link to="/tags">In {{post.tag}}</router-link></h4>
      </header>
      <p class="post-content" v-html="content"></p>
    </article>
    <footer>
      <div>
        <span v-if="pre" class="pre"><router-link :to="{name: 'post', params: {id: post.index-1}}">上篇：{{ postPre }}</router-link></span>
        <span v-if="next" class="next"><router-link :to="{name: 'post', params: {id: post.index+1}}">下篇：{{ postNext }}</router-link></span>
      </div>
    </footer>
  </div>
</template>

<script>
import {markdown} from '../../common/js/markdown'
import blogData from 'static/data.json'

export default {
  data() {
    return {
      post: {},
      content: 0,
      next: true,
      pre: true
    }
  },
  created() {
    this.fetchData()
    this.show()
  },
  watch: {
    '$route' (to, from) {
      this.fetchData()
      this.show()
    }
  },
  methods: {
    fetchData() {
      let index = this.$route.params.id
      this.post = blogData.article[index]
      let url = 'static/article/' + this.post.name
      this.$http(url).then(res => {
        this.content = markdown(res.data)
      })
    },
    show() {
      if (this.post.index === 0) {
        this.next = true
        this.pre = false
      } else if (this.post.index === blogData.article.length - 1) {
        this.next = false
        this.pre = true
      } else {
        this.pre = true
        this.next =true
      }
    }
  },
  computed: {
    postPre: function () {
      return blogData.article[this.post.index - 1].title
    },
    postNext: function () {
      return blogData.article[this.post.index + 1].title
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl'

  .post
    width 100%
    box-shadow 0 0 1px rgba(0, 0, 0, .25)
    header
      padding 40px 0
      .post-title
        font-size 23px
        color $color-text
        text-align center
      .post-date
        width 90%
        margin 0 auto
        padding 1.2em 0 1.8em 0
        color $color-text-l
        font-size 13px
        text-align center 
        border-bottom 1px solid #ececec
        a
          display inline-block
          margin-left 1em
          padding 0 1em
          border-left 1px solid $color-text-l
          border-right 1px solid $color-text-l
          text-decoration underline
    .post-content
      width 90%
      margin 0 auto
      line-height: 2em
      color: #333
  footer
    width 100%
    margin 16px auto 
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
