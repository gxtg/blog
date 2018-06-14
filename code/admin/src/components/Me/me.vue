<template>
  <div class="userinfo">
    <div>
      <p class="title">个人信息</p>
      <div class="head">
        <img class="avatar" :src="userinfo.gravatar" alt="">
        <div class="update-img">
          <button type="button" class="btn">更换头像</button>
          <input type="file" accept="image/jpg,image/png,image/gif,image/jpeg" id="imgFile" @change="selectImg" ref="imgFile">
          <div class="img-url" v-show="img_url_show">
            <input type="text" v-model="userinfo.gravatar">
            <i class="icon-close" @click="deleteImg"></i>
          </div>
        </div>
      </div>
      <div class="form-item"><label for="username">称呼：</label> <input class="form-input" id="username" type="text" v-model="userinfo.name"></div> 
      <div class="form-item"><label for="sologan">签名：</label> <input class="form-input" id="sologan" type="textarea" v-model="userinfo.sologan"></div>
      <p style="font-size: 13px; cursor: pointer; text-align: right" @click="updatepwd = !updatepwd">点此修改密码</p>
      <div class="form-item" v-show="updatepwd"><label for="oldpwd">原密码：</label> <input class="form-input" id="oldpwd" type="text" v-model="pwd.old_pwd"></div>
      <div class="form-item" v-show="updatepwd"><label for="newpwd">新密码：</label> <input class="form-input" id="newpwd" type="password" v-model="pwd.new_pwd"></div>
      <span class="submit" @click="save()">提交</span>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  import { getMe, modifyMe, uploadImg, delImg } from '../../service/api'
  
  export default {
    data () {
      return {
        img_url_show: false, // 用于显示上传的图片返回地址
        userinfo: {},
        pwd: {
          old_pwd: '',
          new_pwd: ''
        },
        updatepwd: false // 控制修改密码框的显示
      }
    },
    mounted() {
      getMe().then(res => {
        if (res.data.code) {
          this.userinfo = res.data.data[0]
        }
      }).catch(err => {
        alert('获取内容失败')
      })
    },
    methods: {

      // 上传头像
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
              this.userinfo.gravatar = res.data.data.file
            }
            }).catch(err => {
              alert('获取内容失败')
            })
        } 
      },
      
      // 删除头像
      deleteImg() {
        this.$refs.imgFile.files[0].value = ''
        let id = this.userinfo.gravatar.split('images/')[1]
        if (!id) {
          this.img_url_show = false
        } else {
          delImg({id: id}).then(res => {
            if (res.data.code) {
            }
          })
        }
      },
      
      // 保存修改信息
      save () {
        if (this.pwd.old_pwd == '' || this.pwd.new_pwd == '') {
          modifyMe(this.userinfo).then(res => {
            if (res.data.code) {
              alert('保存成功')
            }
          }).catch(error => {
            alert('保存失败')
          })
          this.pwd.old_pwd = md5(this.pwd.old_pwd).toUpperCase()
        } else {
          this.pwd.old_pwd = md5(this.pwd.old_pwd).toUpperCase()
          modifyMe(this.userinfo, this.pwd).then(res => {
            if (res.data.code) {
              alert('保存成功')
            }
          }).catch(error => {
            alert('保存失败')
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

.userinfo
  position absolute
  top 25%
  left 50%
  width 335px
  height 400px
  margin-left -167px
  color #667d99

.form-input
  display inline-block
  width 230px
  padding 10px 8px
  font-size 15px
  background-color: #fff
  border 2px solid #667d99
  border-radius 4px
  color #667d99
  outline 0
  &:focus 
    border-color #e7672e

.head
  text-align center
  .avatar 
    width 80px
    height 80px
    overflow hidden
    border-radius 50%

  .update-img
    position relative
    height 30px
    line-height 30px
    padding 10px 0
    font-size 13px
    text-align center
    .btn
      float left
      border-radius 4px
      padding 10px 0
      width 90px
      background-color #e7edf3
      color #667d99
      border 0
      outline 0   
    > input 
      position absolute
      top 0
      left 0
      width 90px
      height 30px
      opacity 0
    .img-url
      float right
      min-width 230px
      line-height 1.5
      padding 5px 0
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
.form-item
  padding 10px 0
  label
    display inline-block
    width 78px
    text-align left

.submit 
  background-color #fff
  border-radius 4px
  margin-top 10px
  margin-left 80px
  padding 10px 20px
  font-size 14px
  color #667d99
  outline 0
  border 1px solid  #667d99
</style>