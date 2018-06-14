/**
 * aiticle
 */

export const state = () => ({

  // 列表文章
  art: {
    pagination: {},
    list: []
  },

  fetch: false,

  // 文章详情
  details: {}
})

export const mutations = {
  FETCH_ART(state) {
    state.fetch = true
  },

  SET_ART_SUCCESS(state, data) {
    state.art = data
    state.fetch = false
  },

  SET_ART_FAIL(state) {
    state.art = { pagination: {}, list: [] }
    state.fetch = false
  },

  SET_DETAILS(state, data) {
    state.details = data
  }
}
