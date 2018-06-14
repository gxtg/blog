/**
 *
 * option
 */

export const state = () => {
  return {
    // 是否有侧栏
    // isAsidePage: false,

    // 错误页面
    isError: false,

    // 是否为移动端
    mobileLayout: false,

    // 移动端侧边栏
    mobileSidebar: false,

    // ua
    userAgent: '',

    // 博主信息
    adminInfo: {}

    // // 网站信息
    // option: {},

    // isWelcome: true
  }
}

export const mutations = {

  // 设置UA
  SET_USER_AGENT(state, action) {
    state.userAgent = action
  },

  // 设置是否移动端状态
  SET_MOBILE_LAYOUT(state, action) {
    state.mobileLayout = action
  },

  // 设置是否移动端状态
  SET_MOBILE_SIDEBAR(state, action) {
    state.mobileSidebar = action
  },

  // 博主用户信息
  SET_ADMIN_INFO(state, data) {
    state.adminInfo = data
  },

  // 错误页面
  SET_ERROR_PAGE(state, data) {
    state.isError = data
  }
}
