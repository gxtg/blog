import path from 'path'
import bodyParser from 'koa-bodyparser'
import staticFiles from 'koa-static'
import Rule from './rule'
import Send from './send'
// import Auth from './auth'
import Log from './log'
import Func from './func'

export default app => {

    //缓存拦截器
    app.use(async (ctx, next) => { 
        if (ctx.url == '/favicon.ico') return

        await next()
        ctx.status = 200
        ctx.set('Cache-Control', 'must-revalidation')
        ctx.set("Access-Control-Allow-Origin", "*")
        if (ctx.fresh) {
            ctx.status = 304
            return
        }
    })

    // 日志中间件
    app.use(Log())

    // 数据返回的封装
    app.use(Send())

    // 方法封装
    app.use(Func())

    // //权限中间件
    // app.use(Auth())

    //post请求中间件
    app.use(bodyParser())
    
    //静态文件中间件
    app.use(staticFiles(path.resolve(__dirname, '../../../public')));

    // 规则中间件
    Rule({
        app,
        rules: { // 将文件名注册到app上
            path: path.join(__dirname, '../controller')
        }
    })

    // 增加错误的监听处理
    app.on("error", (err, ctx) => {
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                ctx.log.error(err.stack)
            }
        }
    })

}