import api from './fetch'

// 登录
export const checkLogin = (username, password) => api.post('user/login', {
  username: username,
  pwd: password
})


// 获取草稿列表参数可选
export const getDraftList = (obj) => {
  return api.get('drafts', obj)
}

export const getArtList = (obj) => {
  return api.get('articles', obj)
}

export const getDraft = id => {
  return api.get('drafts/' + id)
}

export const updateDraftContent = (id, content) => {
  return api.patch('drafts/' + id, {content})
}

export const updateDraftTitle = (id, title) => {
  return api.patch('drafts/' + id, {title})
}

export const updateDraftTags = (id, tags) => {
  return api.patch('drafts/' + id, {tags})
}

// 在数据库tag集合中创建新元素
export const createTags = tagName => {
  return api.post('tag', {name: tagName})
}

export const getAllTags = () => {
  return api.get('tags')
}

export const createDraft = title => {
  return api.post('draft', {title: title})
}

export const publish = id => {
  return api.patch('article/' + id)
}

export const deleteDraft = id => {
  return api.delete('drafts/' + id)
}

export const searchTagWithWord = keyword => {
  return api.get('tags', {'keyword': keyword})
}

export const modifyTag = (id, name) => {
  return api.patch('tags/' + id, {name})
}
export const deleteTag = id => {
  return api.delete('tags/' + id)
}

// 个人信息

export const getMe = () => {
  return api.get('user/info')
}
export const modifyMe = (baseInfo, pwd) => {
  if (pwd) {
    return api.post('user/info', {baseInfo, pwd})
  } else {
    return api.post('user/info', {baseInfo})
  }
}

// 上传图片
export const uploadImg = obj => {
  return api.post('upload_img', obj)
}

// 删除图片
export const delImg = obj => {
  return api.post('delete_img', obj)
}