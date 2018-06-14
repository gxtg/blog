<template>
  <ul class="post-list reset-list">
    <li class="post-list-item" v-for="(post, index) in postList" :key="index" @click="focus(index)">
      <article class="post-thumb" :class="[post['draftPublished'] ? 'published' : post['article'] ? 'updated' : '', {'active': post['_id'] === currentId}]">
        <h3 class="post-title"><a href="javascript:;">{{post['title']}}</a></h3>
        <h6 class="post-time">{{ post['lastEditTime'] | dateFormat('yyyy-MM-dd') }}</h6>
        <p class="post-content" v-text="post['excerpt']"></p>
      </article>
    </li>
  </ul>
</template>

<script>
  import {mapState, mapMutations } from 'vuex'

  export default {
    props: {
      postList: {
        type: Array,
        required: true,
        'default': []
      },
      currentId: {
        type: String,
        required: true,
        'default': ''
      }
    },
    computed: {
      ...mapState(['postSaved', 'postTitleSaved', 'postIndex'])
    },
    methods: {
      ...mapMutations(['POST_FOCUS']),
      // 判断文章是否保存，没有保存则出现提示，不进行切换
      focus (index) {
        if (index !== this.postIndex) {
          if (!this.postSaved || !this.postTitleSaved) {
            alert('当前文章正在保存中,请稍后重试')
            return
          } else {
            this.POST_FOCUS(index)
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
 @import '../../common/style/_settings.styl';

.post-list
  border-top 1px solid $border
.post-list-item
  cursor pointer
  margin 0 25px
  padding 20px 0
  border-bottom 1px solid $border
.post-thumb
  padding-left 5px
  &.published
    border-left 2px solid $green
  &.updated
    border-left 2px solid $yellow
  .post-title
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    font-size 16px
    line-height 1.3
    font-weight 400
    margin 0 0 4px
    padding-bottom 0
  &.active
    .post-title
      color $green
  &:hover
    .post-title
      color $green
  .post-content
    color $light
    font-size 12px
    font-weight 400
    line-height 17px
    margin 0
    max-height ( 3 * @line-height )
    overflow hidden
    word-wrap break-word
  .post-time
    color $light
    margin 0 0 6px
.post-thumb-content
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

</style>
