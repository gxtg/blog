import conf from './config'
import router from './router'
import middleware from './middleware'
import './mongodb'

const Koa = require("koa")

const app = new Koa()
middleware(app)
router(app)
app.listen(conf.port, '127.0.0.1', () => {
    console.log(`server is running at http://127.0.0.1:${conf.port}`)
})