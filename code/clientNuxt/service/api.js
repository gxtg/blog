import ax from './axios'

// 获取用户信息
export function getAuth() {
  console.log('user')
  return ax.get('/user/info')
    .then(res => res.data)
}

// 获取网站配置项
// export function getOpt () {
//   return ax.get('/option')
//           .then(res => res.data)
// }

// 标签列表
export function getTag(params) {
  return ax.get('/tags/classify', { params })
    .then(res => res.data)
}

// 获取文章列表
export function getArts(params) {
  return ax.get('/articles', { params })
    .then(res => res.data)
}

// 文章归档
export function getallArts() {
  return ax.get('/articles/classify')
    .then(res => res.data)
}

// 获取单个文章
export function getArt(data) {
  return ax.get(`/articles/${data.id}`)
    .then(res => res.data)
}

// 文章点赞
export function likeArt(id) {
  return ax.get('/article/like/' + id)
    .then(res => res.data)
}
