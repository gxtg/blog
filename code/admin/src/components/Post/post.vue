<template>
  <div class="container-with-aside">
    <section class="post-list-column">
      <h3 class="page-title"><i class="icon-article"></i> {{ status? '文章' : '草稿'}} <i class="icon-xselect" @click="getAll"></i> <span class="post-add" @click="newPost">{{ status? '' : '新建'}}</span> </h3>
      <post-list :postList="postList" :currentId="postId"></post-list>
    </section>
    <div class="post-edit">
      <article-editor v-if="null !== postId"></article-editor>
    </div>
  </div>
</template>

<script>
import ArticleEditor from './articleEditor.vue'
import PostList from '../Common/postList.vue' 
import { getDraftList, getArtList, createDraft } from '../../service/api.js'
import {mapState, mapMutations} from 'vuex'

export default {
  components: {
    ArticleEditor,
    PostList
  },
  created() {
    this.getAllPosts()
  },
  computed: {
    ...mapState(['status', 'postId', 'postList', 'postSaved', 'postTitleSaved'])
  },
  methods: {
    ...mapMutations(['RECEIVE_ALL_POSTS', 'POST_CREATE', 'SWITCH_STATUS']),
    getAllPosts() {
      getDraftList().then(res => {
        if (res.data.code) {
          this.RECEIVE_ALL_POSTS(res.data.data)
        }
      })
    },
    getAll() {
      this.SWITCH_STATUS()
      if (this.status) {
        getArtList().then(res => {
          if (res.data.code) {
            this.RECEIVE_ALL_POSTS(res.data.data)
          }
        })
      } else {
        this.getAllPosts()
      }
    },
    newPost() {
      if (!this.postSaved || !this.postTitleSaved) {
        alert('当前文章正在保存中,请稍后重试')
      } else {
        createDraft('新文章').then(res => {
          if (res.data.code) {
            this.POST_CREATE(res.data.data)
          }
        })
      }
    }
  }
}
</script> 

<style lang="stylus">

  @import '../../common/style/_settings.styl';

  .container-with-aside
    height 100%
  .post-list-column
    float left
    border-right 1px solid $border
    height 100%
    width 300px
    overflow-y auto
  .post-add
    cursor pointer
    float right
    margin-right 10px
    margin-top 2px
  .page-title
    color $light
    padding-left 25px
    font-weight 400
  .post-edit
    position relative
    overflow auto
    height 100%

</style>