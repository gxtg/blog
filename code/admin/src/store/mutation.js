import {
  RECEIVE_ALL_POSTS,
  POST_FOCUS,
  POST_EDIT,
  POST_TITLE_EDIT,
  POST_SAVE,
  POST_TITLE_SAVE,
  POST_DELETE,
  POST_PUBLISH,
  POST_TITLE_UPDATE,
  POST_EXCERPT_UPDATE,
  POST_CONTENT_UPDATE,
  POST_LAST_EDIT_TIME,
  POST_CREATE,
  POST_TAG_UPDATE,
  TOKEN_CREATE,
  TOKEN_DELETE,
  SWITCH_STATUS
} from './mutation_types'

// mutations
export default {
  [TOKEN_CREATE] (state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  [TOKEN_DELETE] (state) {
    sessionStorage.removeItem('token')
    state.token = null
  },
  
  [SWITCH_STATUS] (state) {
    state.status = !state.status
  },

  [RECEIVE_ALL_POSTS](state, postList) {
    // 保存草稿列表
    if (state.postSaved && state.postTitleSaved) {
      state.postList = postList.list
      state.total = postList.total
      if (postList.list.length === 0) {
        state.postId = ''
        state.postIndex = -1
      }
    }
  },

  [POST_FOCUS](state, index) {
    // 当前草稿还没保存的话不允许切换
    if (state.postSaved && state.postTitleSaved) {
      state.postIndex = index
      state.postId = state.postList[index]._id
    }
  },

  [POST_EDIT](state) {
    if (state.postSaved) {
      state.postList[state.postIndex].draftPublished = false // 设置草稿的性质为未发布
      state.postSaved = false // 设置草稿的保存状态为未保存，即编辑状态
    }
  },

  [POST_SAVE](state) {
    if (!state.postSaved) {
      state.postSaved = true // 设置草稿的状态为已保存，即可退出编辑状态
    }
  },

  [POST_TITLE_EDIT](state) {
    if (state.postTitleSaved) {
      state.postList[state.postIndex].draftPublished = false
      state.postTitleSaved = false
    }
  },

  [POST_TITLE_SAVE](state) {
    if (!state.postTitleSaved) {
      state.postTitleSaved = true
    }
  },

  [POST_DELETE](state) {
    if (state.postSaved && state.postTitleSaved) {
      state.postList.splice(state.postIndex, 1)

      if (state.postList.length) {
        state.postIndex = 0
        state.postId = state.postList[0]._id
      } else {
        state.postId = null
        state.postIndex = -1
      }
    }
  },

  [POST_PUBLISH](state) {
    state.postList[state.postIndex].draftPublished = true
  },

  [POST_TITLE_UPDATE](state, title) {
    state.postList[state.postIndex].title = title
  },

  [POST_EXCERPT_UPDATE] (state, excerpt) {
    state.postList[state.postIndex].excerpt = excerpt
  },

  [POST_CONTENT_UPDATE] (state, content) {
    state.postList[state.postIndex].content = content
  },

  [POST_LAST_EDIT_TIME] (state, time) {
    state.postList[state.postIndex].lastEditTime = time
  },

  [POST_TAG_UPDATE](state, tags) {
    state.postList[state.postIndex].tags = tags
  },

  [POST_CREATE](state, post) {
    state.postList.unshift(post)
    state.postIndex = 0
    state.postId = post._id
  }
}

