<template>
  <div>
    <section v-if="postIndex === -1">
      <div class="first-wrap">写下你想写的<br>分享你的故事</div>
    </section>
    <section v-else>
      <div :class="{'title-active': !postTitleSaved}">
        <input type="text" class="form-control big only-border-bottom" :value="postList[postIndex].title" @change="updateTitle">
      </div>
      <div class="clearfix">
        <div class="half-container">
          <i class="" style="margin-right:5px"></i>
          <span class="tag" v-for="(tag, index) in postList[postIndex].tags" :key="index">{{tag['name']}} <i class="icon-close iconfont delete-tag" @click="deleteTag(tag._id)"></i></span>
          <div class="tag active">
            <span v-show="!tagInput" @click="addTag()">+</span> <input type="text" class="tag-input" v-show="tagInput" v-model="tagNew" placeholder="使用回车键提交" @keyup.13="submitTag">
            <ul class="search-list reset-list" v-if="tagInput" v-show="tagsToAdd.length">
              <li class="search-item" v-for="(tag, index) in tagsToAdd" :key="index" @click="submitTag(tag['name'])">{{tag['name']}}</li>
            </ul>
          </div>
        </div>
        <div class="half-container">
          <div class="btn-tool r">
            <button type="button" class="btn" @click="put">发布</button>
          </div>
          <div class="btn-tool r">
            <button type="button" class="btn">上传图片</button>
            <input type="file" accept="image/jpg,image/png,image/gif,image/jpeg" @change="selectImg" ref="imgFile">
            <div class="img-url" v-show="img_url_show">
              <input type="text" v-model="imgUrl">
              <i class="icon-close" @click="deleteImg"></i>
            </div>
          </div>
        </div>
      </div>
      <editor class="editor" :value="editorContent" @input="updateContent"></editor>
    </section>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import { getDraft, updateDraftTitle, updateDraftTags, createTags, publish, searchTagWithWord, updateDraftContent, deleteDraft, uploadImg, delImg } from '../../service/api.js'
import Editor from '../Common/editor.vue'

export default {
  components: {
    Editor
  },
  data () {
    return {
      tagsToAdd: [],
      tagNew: '',
      tagInput: false,
      editorContent: '', // 编辑框的内容
      img_url_show: false,
      imgUrl: ''
    }
  },
  created () {
    if (this.postId !== null && this.postIndex !== -1) {
      getDraft(this.postId).then(res => {
        this.editorContent = res.data.data.content
        this.POST_CONTENT_UPDATE(res.data.data.content)
        this.tagNew = ''
        this.tagInput = false
      }).catch(err => {
        console.log(err)
        alert('网络错误,获取文章失败')
      })
    }
  },
  watch: {
    postId (val) {
      if (val !== null) {
        getDraft(this.postId).then(res => {
            this.editorContent = res.data.data.content
            this.POST_CONTENT_UPDATE(res.data.data.content)
            this.tagNew = ''
            this.tagInput = false
        }).catch(err => {
            console.log(err)
            alert('网络错误,获取文章失败')
        })
      }
    },
    tagNew (val) {
      this.searchTags(val)
    }
  },
  computed: {
    ...mapState([
      'postId', 
      'postIndex', 
      'postList', 
      'postSaved', 
      'postTitleSaved'
    ])
  },
  methods: {

    ...mapMutations([
      'POST_PUBLISH', 
      'POST_TITLE_UPDATE', 
      'POST_TAG_UPDATE', 
      'POST_TITLE_SAVE', 
      'POST_EXCERPT_UPDATE',
      'POST_CONTENT_UPDATE', 
      'POST_LAST_EDIT_TIME', 
      'POST_DELETE']),

    // 更新标题，
    updateTitle (e) {
      updateDraftTitle(this.postId, e.target.value).then(res => {
        if (res.data.code) {
          this.POST_TITLE_UPDATE(res.data.data.title)
          this.POST_LAST_EDIT_TIME(res.data.data.lastEditTime)
          this.POST_TITLE_SAVE()
        }
      })

    },

    // 控制添加标签框的显示
    addTag () {
      this.tagInput = true
    },

    // 删除标签
    deleteTag (_id) {
      let newTagArr = []
      for (let i of this.postList[this.postIndex].tags) {
        if (i._id !== _id) {
          newTagArr.push(i._id)
        }
      }
      return updateDraftTags(this.postId, newTagArr).then(res => {
          if (res.data.code) {
            this.POST_TAG_UPDATE(res.data.data.tags)
          }
      }).catch(() => {
          alert('网络错误,更新标签失败')
      })
    },
    
    // 添加标签
    submitTag (val) {
      this.tagInput = false // 隐藏输入框
      let tag
      if (typeof val === 'string') {
        tag = val
      } else {
        tag = this.tagNew.replace(/(^\s*)|(\s*$)/g, '')
      }
      this.tagNew = '' // 将标签输入框清空
      if (tag === '') {
        return
      }
      // 在数据库tab集合中创建新的tag
      createTags(tag).then(res => {
        let _id = res.data.data._id
        if (this.postList[this.postIndex].tags.some(item => item._id === _id)) {
          return 
        }
        let newTagArr = this.postList[this.postIndex].tags.map(item => {
          return item._id
        })
        newTagArr.push(_id)
        // 更新草稿的标签
        return updateDraftTags(this.postId, newTagArr).then(res => {
          if (res.data.code) {
            this.POST_TAG_UPDATE(res.data.data.tags)
          }
        })
      }).catch(() => {
        alert('网络错误,增加标签失败')
      })
    },
    
    // 搜索标签
    searchTags(val) {
      searchTagWithWord(val).then(res => {
        if (res.data.code) {
          this.tagsToAdd = res.data.data
        }
      })
    },
    
    // 上传草稿内容
    submitContent(content) {
      console.log(content, this.postId)
      updateDraftContent(this.postId, content).then(res => {
        if (res.data.code) {
          this.POST_CONTENT_UPDATE(res.data.data.content)
          if (res.data.data.excerpt) {
            this.POST_EXCERPT_UPDATE(res.data.data.excerpt)
          } 
          this.POST_LAST_EDIT_TIME(res.data.data.lastEditTime)
          this.POST_TITLE_SAVE()
        } else {
          throw new Error()
        }
      }).catch((errno) => {
        alert('网络错误!文档保存失败!请自行保存文档!')
      })
    },
    
    // 发布文章，将文章从草稿状态改为发布状态
    put () {
      if (!this.postSaved || !this.postTitleSaved) {
          alert('当前文章正在保存中,请稍后重试')
          return
        }
      publish(this.postId).then(res => {
        alert('发布成功')
        this.POST_PUBLISH(res.data.data._id)
      }).catch(err => {
        alert((err.errorInfo && err.errorInfo.error + '') || '网络错误,保存失败')
      })
    },

    // 编辑框失去焦点是触发更新，实现实时保存
    updateContent (val) {
      if (this.editorContent === val) {
        return
      }
      this.editorContent = val
      
      this.submitContent(val)
    },

    // 删除草稿
    deletePost() {
      if (this.postSaved) {
        deleteDraft(this.postId).then(res => {
          if (res.data.code) {
            this.POST_DELETE()  
          }
        }
      )} else { 
        alert('文章尚未保存,请稍后再试')
      }
    },
    
    // 上传图片
    selectImg() {
      let files = this.$refs.imgFile.files
      if (files.length === 0) {
        return
      }
      if (files[0].size/1024 > 1024) {
        alert('上传的图片大小不能超过1MB')
      }else {
        this.imgData = new FormData()
        this.imgData.append('file', files[0])
        uploadImg(this.imgData).then(res => {
          if (res.data.code) {
            this.img_url_show = true
            this.imgUrl = res.data.data.file
          }
          }).catch(err => {
            alert('获取内容失败')
          })
      } 
    },
    

    // 删除图片
    deleteImg() {
      this.$refs.imgFile.files[0].value = ''
      let id = this.imgUrl.split('images/')[1]
      if (!id) {
        this.img_url_show = false
      } else {
        elImg({id: id}).then(res => {
          if (res.data.code) {
            alert("删除成功")
          }
        })
      }
    }  
  }
}
</script>

<style lang="stylus">
@import '../../common/style/_settings.styl';

.first-wrap
  position absolute
  top 40%
  width 100%
  height 64px
  font-size 20px
  line-height 2em
  text-align center
  font-weight 600
.title-active
  .big
    border 1px solid $yellow
.big
  transition border 0.5s
  padding 13px 20px 13px 30px
  font-size 26px
.only-border-bottom
  border 1px solid transparent
  border-bottom 1px solid $border
.half-container
  float left
  box-sizing border-box
  width 50%
  padding 15px
  .btn-tool
    position relative
    height 30px
    margin-right 60px
    line-height 30px
    font-size 13px
    text-align center
    .btn
      border-radius 4px
      padding 8px 0
      width 90px
      background-color #e7edf3
      border 0
      outline 0     
    > input 
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      opacity 0
    .img-url
      position absolute
      top 150%
      left -70px
      z-index 40
      min-width 230px
      line-height 1.5
      padding 6px 0
      border-radius 4px
      background-color #fff
      box-shadow 0 2px 6px rgba(0, 0, 0, .35)
      > input 
        font-size 14px
        line-height 1.6
        border 0
        outline 0
      i
        display inline-block
        padding 6px
        font-size 15px
        color #798669
        vertical-align middle
.tag
  position relative
  display inline-block
  padding 5px
  font-size 14px
  color $light
  border-bottom 2px solid $light
  margin-right 20px
  span 
    font-size 18px
    cursor pointer
  &:hover
    color $green
    border-bottom 2px solid $green
    .iconfont
      display inline
  &.active
    color $green
    border-bottom 2px solid $green
    position relative
.search-list
  position absolute
  top 25px
  left -6px
  z-index 100
  width 100%
  padding 5px
  background white
  border: 1px solid $border
  border-radius 4px
  box-shadow 0 6px 12px rgba(0,0,0,.03)
.search-item
  color $light
  padding-left 4px
  &:hover
    color  $green
  &+&
    padding-top 10px
.delete-tag
  display none
  position absolute
  right -8px
  top -3px
  font-size 12px
.tag-input
  border none
  background transparent
  color $green
  font-size 14px
  outline 0
.editor
  box-sizing border-box
  height calc(100vh - 122px)
  padding-bottom: 10px
</style>