import service from '../service'
// import { setTimeout } from 'timers'

export const actions = {

  nuxtServerInit(store, { params, route, isServer, req }) {
    // 设备检查类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    store.commit('options/SET_MOBILE_LAYOUT', isMobile)
    store.commit('options/SET_USER_AGENT', userAgent)

    const initAppData = [
      // 获取信息
      store.dispatch('getAdminInfo'),

      // 标签
      store.dispatch('getTag')
    ]

    if (!isMobile) {
      initAppData.push(store.dispatch('getArtList'))
    }

    return Promise.all(initAppData)
  },

  // 获取博主用户信息
  async getAdminInfo({ commit }) {
    const res = await service.getAuth()
      .catch(err => console.error(err))
    commit('options/SET_ADMIN_INFO', res.data[0] || {})
  },

  // 获取文章
  async getArtList({ commit, state }, data) {
    commit('article/FETCH_ART')
    const res = await service.getArts(data)
      .catch(err => console.error(err))
    if (res && res.code === 1) {
      let list
      list = res.data.list
      commit('article/SET_ART_SUCCESS', {
        list,
        pagination: {
          cur_page: 1,
          total_page: parseInt(res.data.total / 8) + 1
        }
      })
    } else commit('article/SET_ART_FAIL')
  },

  // 获取更多文章
  async getMoreArt({ commit, state }, data) {
    commit('article/FETCH_ART')
    const res = await service.getArts(data)
      .catch(err => console.error(err))
    if (res && res.code === 1) {
      let list
      list = state.article.art.list.concat(res.data.list)
      commit('article/SET_ART_SUCCESS', {
        list,
        pagination: {
          cur_page: parseInt(list.length / 8) + 1
        }
      })
    } else commit('article/SET_ART_FAIL')
  },

  // 全部文章列表 sitemap
  async getSitemap({ commit }) {
    commit('sitemap/FETCH_ART')
    const res = await service.getallArts()
      .catch(err => console.error(err))
    if (res && res.code === 1) commit('sitemap/SET_ART_SUCCESS', res.data)
    else commit('sitemap/SET_ART_FILE')
  },

  // 获取标签
  async getTag({ commit }) {
    const res = await service.getTag()
      .catch(err => console.error(err))
    commit('tag/SET_TAG', res.data || {})
  },

  // 文章详情
  async getArt({ commit }, data) {
    const res = await service.getArt(data)
      .catch(err => console.error(err))
    commit('article/SET_DETAILS', res.data || {})
  },

  // 喜欢文章
  async likeArt({ commit }, data) {
    const res = await service.likeArt(data)
      .catch(err => console.error(err))
    return res
  }
}
