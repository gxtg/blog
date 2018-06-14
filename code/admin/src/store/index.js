/**
 * Created by chuck7 on 16/7/30.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutation'

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  token: null, // 令牌
  status: false, // 标识文章还是草稿，false表示草稿，true表示文章
  postId: '',
  postIndex: -1,
  total: 0, // 草稿数量
  postSaved: true, // 编辑的帖子是否保存 这和下面的状态标识了编辑状态，只有编辑状态完成时才能退出进行其它操作
  postTitleSaved: true, // 编辑的帖子标题是否保存，把标题单独拿出来是为了有时候只想好了题目，先占个位置
  tags: [],
  postList: [
    // {
    //   id: '', // 帖子的主键
    //   title: '',
    //   tag: [],
    //   createTime: '',
    //   lastEditTime: '',
    //   excerpt: '',
    //   content: '',
    //   draftPublished: false
    // }
  ] // 帖子列表基本信息
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
