<template>
  <div id="share">
    <div class="share-box" :class="{ mobile: mobileLayout }">
      <a title="微信" rel="nofollow" class="share-link wechat" @click.prevent="shareWindow(`http://qr.topscan.com/api.php?text=${url}&w=300&el=h&m=10`)">
        <i class="icon-wechat"></i>
      </a>
      <a title="微博" rel="nofollow" class="share-link weibo" @click.prevent="shareWindow(`http://service.weibo.com/share/share.php?url=${url}&title=${title()}&source=${url}&sourceUrl=${url}&content=${description()}`)">
        <i class="icon-weibo"></i>
      </a>
      <a title="豆瓣" rel="nofollow" class="share-link douban" @click.prevent="shareWindow(`https://www.douban.com/recommend/?url=${url}&title=${title()}`)">
        <i class="icon-douban"></i>
      </a>
      <a title="印象笔记" rel="nofollow" class="share-link evernote" @click.prevent="shareWindow(`https://www.evernote.com/clip.action?url=${url}&title=${title()}`)">
        <i class="icon-note"></i>
      </a>
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'share',

  computed: {
    url () {
      return `https://120.78.220.145${this.$route.fullPath}`
    },
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },

  methods: {
    description () {
      try { if (document) return document.getElementsByName('description')[0].getAttribute('content') }
      catch (err) { return '' }
    },
    title () {
      try { if (document) return document.title }
      catch (err) { return '120.78.220.145' }
    },
    shareWindow (url) {
      url = url.includes('mailto') ? url.replace(/\s|\||120.78.220.145/g, '') : encodeURI(url)
      // console.log(url)
      // 给打开的窗口命名
      let winName = "newWin"
      // screen.availWidth 获得屏幕宽度
      // screen.availHeight 获得屏幕高度
      // 居中的算法是：
      // 左右居中： (屏幕宽度 - 窗口宽度)/2
      // 上下居中： (屏幕高度 - 窗口高度)/2
      // 窗口宽度,需要设置
      let awidth = screen.availWidth / 6 * 2
      // 窗口高度,需要设置
      let aheight = screen.availHeight / 5 * 2
      // 窗口顶部位置,一般不需要改
      let atop = (screen.availHeight - aheight) / 2
      // 窗口放中央,一般不需要改
      let aleft = (screen.availWidth - awidth) / 2
      // 新窗口的参数
      let param0 = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0'
      // 新窗口的左部位置，顶部位置，宽度，高度
      let params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${param0}`
      // 打开新窗口
      const win = window.open(url, winName, params)
      // 新窗口获得焦点
      win.focus ()
    }
  }
}
</script>

<style lang="scss" scoped>

#share {
  .share-box {
    &.mobile {
      width: 100%;
      display: flex;
    }

    >.share-link {
      cursor: pointer;
      display: inline-block;
      text-align: center;

      &.icon-rating:hover {
        background-color: rgb(123, 179, 46);
      }
    }
  }
}
</style>