<template>
  <div :class="{'editor-active': !postSaved}" >
    <textarea id="editSection"></textarea>  
  </div>
</template>

<script>
import { marked } from '../../utils/marked'
import { mapState } from 'vuex'
import SimpleMDE from 'simplemde'

export default {
  props: {
    value: {
      type: String,
      required: true, // 用于初始化
      'default': ''
    }
  },
  data () {
    return {
      smde: null
    }
  },
  mounted() {
    this.smde = new SimpleMDE({
      autoDownloadFontAwesome: true,
      element: document.getElementById('editSection'),
      previewRender: function (plainText) {
          return marked(plainText) // Returns HTML from a custom parser
      },
      spellChecker: false,
      autosave: 'delay',
      toolbar: ["bold", "italic", "strikethrough", "|", "heading", "quote", "ordered-list", "unordered-list", "|", "link", "image", "table", "fullscreen"]
    })
    // 利用“change”事件实现实时预览
    this.smde.codemirror.on('change', () => {
      this.smde.togglePreview() 
    }),
    this.smde.codemirror.on('blur', () => {
      let value = this.smde.value()
      if (this.value === value) {
        return
      }
      this.$emit('input', value)
    })
  },
  computed: {
    ...mapState(['postSaved'])
  },
  destroyed () {
    this.smde = null
  },
  watch: {
    value (val) {
      if (val !== this.smde.value()) {
        this.smde.value(val)
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/style/simplemde.styl';
@import '../../common/style/_settings.styl';

.editor-toolbar
  border-left 0
.editor-active
  .CodeMirror
    border 1px solid $yellow
.CodeMirror
  box-sizing border-box
  height calc(100% - 51px - 32px)
  transition border 0.5s
.CodeMirror-sided
  box-sizing border-box
.editor-preview,
.editor-preview-side
  padding-right 1em
  background white
  font-family $body-font
  font-size $body-font-size
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color $medium
  a
    text-decoration none
    color $medium
  :focus
    outline 0
  img
    border none
  h1, h2, h3, h4, strong
    font-weight 600
    color $dark
  code, pre
    font-family $code-font
    font-size $code-font-size
    background-color $codebg
    -webkit-font-smoothing initial
    -moz-osx-font-smoothing initial
  code
    color #e96900
    padding 3px 5px
    margin 0 2px
    border-radius 2px
    white-space nowrap
  em
    color $light
  p
    word-spacing 0.05em
  img
    max-width 100%
  span.light
    color $light
  span.info
    font-size .85em
    display inline-block
    vertical-align middle
    width 280px
    margin-left 20px
  h1
    margin 0 0 .5em
  h2
    margin: 2em 0 0.8em
    padding-bottom 0.7em
    border-bottom 1px solid #ddd
    a
      color $dark
      &:hover
        border-bottom 2px solid $green
  h3
    margin 0.8em 0 1em 0
    position relative
    &:before
      content "#"
      color $green
      position absolute
      left -0.7em
      top -2px
      font-size 1.2em
      font-weight bold
  h4
    color $light
    margin 1.2em 0
  figure, p, ul, ol
    margin 1.2em 0
  p, ul, ol
    line-height 1.6em
  ul, ol
    padding-left 1.5em
  a
    color $green
    font-weight 600
  blockquote
    margin 2em 0
    padding-left 20px
    border-left 4px solid $green
    p
      font-weight 600
      margin-left 0
  iframe
    margin 1em 0
  p.tip
    padding 12px 24px 12px 30px
    margin 2em 0
    border-left 4px solid $red
    background-color $codebg
    position relative
    border-bottom-right-radius $radius
    border-top-right-radius $radius
    &:before
      position absolute
      top 14px
      left -12px
      background-color $red
      color #fff
      content "!"
      width 20px
      height 20px
      border-radius 100%
      text-align center
      line-height 20px
      font-weight bold
      font-family $logo-font
      font-size 14px
  figure, p
    margin-left 0
  pre
    position relative
    background-color $codebg
    padding .8em .8em .4em
    line-height 1.1em
    border-radius $radius
    code
      overflow-x auto
      display block
      padding 1.2em 1.4em
      line-height 1.5em
      margin 0
      color #525252
      border-radius 0
      white-space pre
      &.lang-html, &.lang-javascript, &.lang-bash, &.lang-css, &.lang-java
        &:after
          position absolute
          top 0
          right 0
          color #ccc
          text-align right
          font-size .75em
          padding 5px 10px 0
          line-height 15px
          height 15px
          font-weight 600
      &.lang-html:after
        content 'HTML'
      &.lang-javascript:after
        content 'JS'
      &.lang-bash:after
        content 'Shell'
      &.lang-css:after
        content 'CSS'
      &.lang-java:after
        content 'Java'
</style>
