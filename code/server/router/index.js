import fs from 'fs'
import path from 'path'
import koaRouter from 'koa-router'
const router = koaRouter()

export default app => {

/*----------------------admin-------------------------------*/

    // 登录请求
    router.post('/api/user/login', app.user.login)
    router.get('/api/user/info', app.user.getinfo)
    router.post('/api/user/info', app.user.update)   

    // 草稿请求
    router.post('/api/draft', app.draft.put) // 上传
    router.patch('/api/drafts/:id', app.draft.update) // 修改
    router.get('/api/drafts', app.draft.getList) // 获取所有
    router.get('/api/drafts/:id', app.draft.getOne) // 获取单个
    router.delete('/api/drafts/:id', app.draft.delete) // 删除

    // 文章请求
    router.patch('/api/article/:id', app.article.put) // 正式上传文章
    router.get('/api/articles', app.article.getList) // 获取文章列表
    router.get('/api/articles/classify', app.article.classify) // 获取文章归档列表
    router.get('/api/articles/:id', app.article.getOne) // 获取单个文章
    router.get('/api/article/like/:id', app.article.addLike) // 文章点赞

    // 标签请求
    router.post('/api/tag', app.tag.put)
    router.patch('/api/tags/:id', app.tag.update)
    router.get('/api/tags', app.tag.getAll)
    router.get('/api/tags/classify', app.tag.classify) // 获取标签归档列表
    router.delete('/api/tags/:id', app.tag.delete)

    // 留言请求
    router.post('/api/message', app.message.put)
    router.patch('/api/messages/:id', app.message.update)
    router.get('/api/messages', app.message.getAll)
    router.delete('/api/messages/:id', app.message.delete)
    // 个人信息请求
    // router.get('/api/me', app.me.get)
    // router.patch('/api/me', app.me.update)

    // 上传图片
    router.post('/api/upload_img', app.other.upload_img)
    router.post('/api/delete_img', app.other.delete_img)

    app.use(router.routes()).use(router.allowedMethods())
}