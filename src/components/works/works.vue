<template>
  <div class="work">
    <div class="work-list" v-for="(work, key) in works" :key="work.index">
      <h2>{{key}}</h2>
      <div class="work-item">
        <ul>
          <li v-for="item in work" :key="item.index">
            <a :href="item.aurl">
              <img :src="item.url" alt="">
              <h4>{{item.name}}<br>{{item.discription}}</h4>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import blogData from 'static/data.json'

export default {
  data() {
    return {
      works: {}
    }
  },
  created() {
    this.works = blogData.work
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl'

  .work
    width 100%
    .work-list
      h2
        padding-top 20px
        font-weight 600
        text-align center
      .work-item
        padding 25px 0
        border-bottom 1px dashed #57ad68
        ul
          display flex
          width 100%
          flex-direction row
          flex-wrap wrap
          justify-content space-between
          align-items flex-start
          li
            position relative
            display inline-block
            height 0
            margin-bottom 1.5em
            border 1px solid #ececec
            border-radius 10px
            &:hover
              border 1px solid #57ad68
            &:hover h4 
              display block 
            @media screen and (min-width: 350px) {
              width 45%
              padding-bottom 45%
            }
            @media screen and (min-width: 750px) {
              width 30%
              padding-bottom 30%
            }
            a
              display inline-block
              width 100%
              padding-bottom 100%
              overflow hidden
              img
                position absolute
                
                height 84%
                margin 8% 8%
              h4
                display none
                position absolute
                left 8%
                right 8%
                bottom 8%
                line-height 1.5em
                color #fff
                background-color #000
                opacity .4
                text-align center    
</style>
