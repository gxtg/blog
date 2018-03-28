<template>
  <div class="tag">
    <div class="tag-list">
      <h2>All tag</h2>
      <div class="tag-item tag-m">
        <a :href="'#' + key" v-for="(tag, key) in tags" :key="key">
          {{key}}
        </a>
      </div>
    </div>
    <div class="tag-list" v-for="(tag, key) in tags" :key="key" :id="key">
      <h2>{{key}}</h2>
      <div class="tag-item">
        <router-link v-for="item in tag" :to="{name: 'post', params: {id: tagContent[item]}}" :key="item.index">{{tagContent[item].title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tags: {},
      tagContent: []
    }
  },
  created() {
    this.$http('static/data.json').then(res => {
      this.tags = res.data.tag
      this.tagContent = res.data.article
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl'

  .tag
    width 100%
    .tag-list
      h2
        padding-top 20px
        font-weight 600
        text-align center
      .tag-m
        a 
         font-weight 600
      .tag-item
        padding 25px 0
        text-align center
        border-bottom 1px dashed #57ad68
        a 
          box-sizing border-box
          display inline-block
          height 20px
          line-height 20px
          margin 0 10px
          font-size 16px
          color $color-link
          &:hover
            border-bottom 1px solid #57ad68
</style>


