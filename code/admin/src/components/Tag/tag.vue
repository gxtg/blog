<template>
  <div class="container-with-aside">
    <section class="post-list-column">
      <h3 class="page-title" style="margin-bottom:0" v-if="null === tagActive"><i class="iconfont icon-tag"></i> 根据标签搜索文章</h3>
      <ul class="clearfix reset-list tag-list" v-else>
        <li class="tag active">
          <span v-show="!tagActive['editing']">{{tagActive['name']}}</span> 
          <i class="iconfont icon-look" v-show="!tagActive['editing']" @click="blurTag()"></i> 
          <i class="icon-write" @click="modify(tagActive)" v-show="!tagActive['editing']"></i> 
          <i class="iconfont icon-close" style="vertical-align: 1px;" @click="deleteTag(tagActive)" v-show="!tagActive['editing']"></i> 
          <input type="text" class="tag-input" v-if="tagActive['editing']" v-model="tagActive['newName']" placeholder="使用回车键提交" @keyup.13="saveTag(tagActive)">
        </li>
      </ul>
      <ul class="clearfix reset-list tag-list" v-show="(tags.length !== 1 || tagActive == null)">
        <li class="tag" v-for="(tag, index) in tags"  v-show="tag !== tagActive" :key="index"> <span @click="searchTag(tag)" v-show="!tag['editing']">{{tag['name']}}</span> </li>
      </ul>
      <post-list :postList="postList" :currentId="postId"></post-list>
    </section>
    <div class="post-edit">
      <article-editor v-if="null !== postId"></article-editor>
    </div>
  </div>
</template>

<script>
  import ArticleEditor from '../Post/articleEditor.vue'
  import PostList from '../Common/postList.vue'
  import { getArtList, getAllTags, modifyTag, deleteTag} from '../../service/api'
  import {mapState, mapMutations} from 'vuex'

  export default{
    components: {
      ArticleEditor,
      PostList
    },
    data() {
      return {
        tagActive:null,
        tags:[]
      }
    },
    created () {
      getAllTags().then(res => {
        if (res.data.code) {
          for (let i of res.data.data) {
            i.newName = ''
            i.editing = false
          }
          this.tags = res.data.data
          getArtList().then(res => {
            if (res.data.code) {
              this.RECEIVE_ALL_POSTS(res.data.data)
            }
          })
        }
      })     
    },
    computed: {
      ...mapState(['postList', 'postIndex', 'postId'])
    },
    methods:{
      ...mapMutations(['RECEIVE_ALL_POSTS']),
      searchTag(tag){
        this.tagActive = tag
        getArtList({tag: tag._id}).then(res => {
          if (res.data.code) {
            this.RECEIVE_ALL_POSTS(res.data.data)
          }
        })
      },
      modify(tag){
        tag.newName = tag.name
        tag.editing = true
      },
      saveTag(tag){
        if(tag.newName === tag.name){
          tag.editing = false
          return;
        }else if('' === tag.newName){
          tag.editing = false
          return;
        }else{
          modifyTag(tag._id, tag.newName).then(res => {
            if(res.data.code){
              tag.name = tag.newName
              tag.editing = false
            }else{
              alert('已有同名标签')
            }
          }).catch(err => {
            alert('网络错误,修改标签失败')
          })
        }
      },
      deleteTag(tag){
        deleteTag(tag.id).then(res => {
          if(res.data.code){
            if(this.tagActive === tag){
              this.getAllPost(0)
              this.tagActive = null
              let index = this.tags.indexOf(tag)
              this.tags.splice(index, 1)
            }
          }
        })
      },
      blurTag(){
        this.tagActive = null
        this.getArtList(0)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../common/style/_settings.styl';

  .tag-list
    padding 15px 0
    margin 0 25px
    &+&
      border-top 1px solid $border
</style>