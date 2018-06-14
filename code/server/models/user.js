import db from '../mongodb'

const Schema = db.Schema

let userSchema = db.Schema({
    username: String,
    pwd: String,
    name: String,
    sologan: {type: String, default: ''}, // 签名
    gravatar: {type: String, default: ''}, // 头像
    createTime: { type: Date, default: Date.now},
    loginTime: Date
})
export default db.model('user', userSchema)