import jwt from 'jsonwebtoken'
import md5 from 'md5'
import conf from '../config'
import userModel from '../models/user'
module.exports = {
    async login (ctx, next) {
        console.log('----------------登录接口 user/login-----------------------');
        let {username, pwd} = ctx.request.body;
        console.log(username)
        try {
            let data = await ctx.findOne(userModel, {username: username}, {}, '');
            console.log(data)
            if (!data) {
                return ctx.sendError('用户名不存在！');
            }
            if (pwd !== md5(data.pwd).toUpperCase()) {
                return ctx.sendError('密码错误,请重新输入！');
            }
            await ctx.update(userModel, {_id: data._id}, {$set:{loginTime: new Date()}}) //更新登陆时间

            let payload = {
                _id: data._id,
                username: data.username,
                name: data.name,

            }
            let token = jwt.sign(payload, conf.auth.admin_secret, {expiresIn: '24h'})  //token签名 有效期为24小时
            ctx.cookies.set(conf.auth.tokenKey, token, {
                httpOnly: false,  // 是否只用于http请求中获取
            });
            console.log('登陆成功')
            ctx.send({message: '登录成功'});
        } catch (e) {
            if (e === '暂无数据') {
                console.log('用户名不存在')
                return ctx.sendError('用户名不存在');
            }
            ctx.throw(e);
            ctx.sendError(e)
        }
        
    },
    async getinfo (ctx, next) {
        console.log('----------------获取用户信息接口 user/getUserInfo-----------------------');
        let token = ctx.request.query.token;
        try {
            let data = await ctx.find(userModel, null, 'name gravatar sologan')
            ctx.send(data)
        }catch (e) {
            ctx.sendError('系统异常!');
        }
        
    },

    async update (ctx, next) {
        console.log('----------------更新用户信息 user/update-----------------------');
        let {baseInfo, pwd} = ctx.request.body
        try {
            if (pwd) {
                let data = await ctx.findOne(userModel, {name: baseInfo._id}, 'pwd', '')
                if (pwd.old_pwd == md5(data.pwd).toUpperCase()) {
                    await ctx.update(userModel, {_id: baseInfo._id}, {pwd: pwd.new_pwd})
                }
            } else {
                await ctx.update(
                    userModel, 
                    {_id: baseInfo._id}, 
                    {name: baseInfo.name, sologan: baseInfo.sologan, gravatar: baseInfo.gravatar}
                )
            }
            ctx.send()
        }catch(e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },

    async del (ctx, next) {
        console.log('----------------删除管理员 user/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(userModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    }
}