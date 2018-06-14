<template>
  <div class="article-list" :class="{'mobile': mobileLayout}">
    <div class="article-cont">
      <h3>{{ article.title }}</h3>
      <div class="meta">
        <span class="time">{{ article.lastEditTime | dateFormat('yyyy.MM.dd hh:mm') }}</span>
        <span class="view">阅读 {{ article.views}}</span>
        <span class="view">喜欢 {{ article.likes}}</span>
      </div>
      <div id="htmlcontent" v-html="articleContent"></div>
    </div>
    <div class="item">
      <div class="info">
        <div class="info-left">
          <span class="likeing" @click="like">
            <i :class="{'is-liked': isLiked}" class="icon-heart"></i>
            <span>{{ article.likes }}</span>
          </span>
          <span class="tag" v-if="!mobileLayout">
            <i class="icon-tag"></i>
            <nuxt-link 
              v-for="list in article.tags" 
              class="tag-list" 
              :key="list._id"
              :to="`/tag/${list._id}`"> {{ list.name }}</nuxt-link>
          </span>
        </div>
      </div>
      <div class="share">
        <share class="article-share"></share>
      </div>
    </div>

    <aside v-if="!mobileLayout" >
      <div 
        class="like" 
        :class="{'is-liked': isLiked}">
        <i
          class="icon-heart_f like"
          :class="{ 'rubberBand': isLiked }"></i>
        <div 
          class="like-decoration"
          :class="{ 'active': isLiked }"></div>     
        <span>{{ article.likes }}</span>
      </div>
    </aside>
  </div>
</template>

<script>
import markdown from '~/plugins/markdown'
import share from '~/components/common/share'
import { scrollTo } from '~/utils/scroll'

export default {
  transition: 'fade',

  scrollToTop: true,

  fetch ({ store, params }) {
    return store.dispatch('getArt', params)
  },

  head () {
    return { title: `${this.$store.state.article.details.title}` }
  },

  data () {
    return {
      likeArticles: [],
      img: '',
      scroll: '',
    }
  },

  components: { share },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    article () {
      return this.$store.state.article.details
    },

    articleContent () {
      return markdown(this.article.content, false, true).html
    },

    isLiked () {
      return this.likeArticles.includes(this.article._id)
    }
  },

  methods: {
    async like () {
      console.log('like')
      if (this.isLiked) return
      const res = await this.$store.dispatch('likeArt', this.article._id)
      if (res.code !== 1) alert(`喜欢文章失败：${res.message}`)
      else {
        this.article.likes += 1
        this.likeArticles.push(this.article._id)
        window.localStorage.setItem('LIKE_ARTICLS', JSON.stringify(this.likeArticles))
      }
    },

    init () {
      this.likeArticles = JSON.parse(window.localStorage.getItem('LIKE_ARTICLS') || '[]')
    },

    initEvent () {
      // lazyImg('.img-pop') 在markdown文件中对img标签进行了预处理
      const list = document.querySelectorAll('.img-pop')
      let _this = this
      for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', (e) => {
          e.stopPropagation()
          this.showDialog = true
          this.img = list[i].getAttribute('src')
        })
      }
    },

    scrollToComment () {
      scrollTo(document.querySelector(`#comment-box`), 500, { offset: 0 })
    }
  },

  mounted () {
    this.init ()
    this.initEvent()
  }
}
</script>

<style lang="scss" scoped>

.article-list {
  width: 100%;
  margin: 0 auto;

  >.article-cont {
    >.meta {
      margin-top: .3rem;
      font-size: .8rem;
      color: #969696;

      span {
        margin-right: .5rem;
      }
    }

    >h3 {
      font-size: 1.3rem;
    }

    >.article-thumb {
      margin: $lg-pad 0;
      img {
        max-width: 100%;
      }
    }
  }
  >.item {
    margin: 3rem 0;
    padding: $lg-pad 0;

    >.info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      >.info-left {
        display: flex;
        align-items: center;

        >.likeing {
          i {
            cursor: pointer;
            font-size: 1.2rem;
            color: $red;
            vertical-align: middle;
            &:hover::before {
              content: '\e908';
            }
          }

          span {
            margin-left: .4rem;
            vertical-align: middle;
          }
        }


        .tag {
          margin-left: 4rem;

          a {
            margin: 0 .5rem;
            text-decoration: underline;

            &:last-child {
              margin: 0;
            }
          }
        }
      }

      a:hover {
        text-decoration: underline;
      }
    }
    >.share {
      margin-top: 1rem;
    }
  }

  >aside {
    position: fixed;
    right: 0;
    bottom: 8.8rem;

    > div {
      position: relative;
      width: $xlg-pad;
      height: $xlg-pad;
      text-align: center;
      line-height: $xlg-pad;
      border: 1px solid $border-color;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.14);
      cursor: pointer;

      &.like:hover {
        color: $red;
        border-color: $red;
      }

      &.comment:hover {
        color: $green;
        border-color: $green;
      }

      &.is-liked {
        color: $red;
      }


      > i {
        font-size: 1.2rem;

        &.rubberBand {
          animation-fill-mode: both;
          animation-name: rubberBand;
        }
      }

      > span {
        position: absolute;
        left: -0.8rem;
        top: -10px;
        line-height: 1;
        color: $black;
        font-size: 1rem;
        padding: $xs-pad $sm-pad;
        background: #eee;
        border-radius: .7rem;
        /* text-align: center; */
        transform: scale(.75);
      }
    }
  }
}
.article-list.mobile {
  /* .article-cont {
  .content {
    
    ul, ol {
      padding-left: .8rem;
    }
    a {
      word-break: break-all;
    }
  } */
  .item {
    font-size: .8rem;

    >.info {
      line-height: 20px;
    }
  }
}
</style>