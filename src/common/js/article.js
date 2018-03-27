import axios from 'axios'
import {markdown} from './markdown'
// import blogData from 'static/data.json'

// export const article = blogData.article

function getUrl(article) {
  let url = new Array(article.length)
  for (let index = 0; index < article.length; index++) {
    url[index] = 'static/article/' + article[index].name
  }
  return url.map(function (value) {
    return axios.get(value).then(res => {
      return Promise.resolve(res.data)
    })
  })
}

export function getArticle(article) {
  let result = getUrl(article)
  return Promise.all(result).then(results => {
    return results.map(function (value) {
      return markdown(value)
    })
  })
}
