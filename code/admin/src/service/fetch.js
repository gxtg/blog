import axios from 'axios'
// import querystring from 'querystring'

const api = axios.create({
  baseURL: '/api/'
})

// 拦截器
api.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default api