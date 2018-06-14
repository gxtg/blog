import tagModel from '../models/message'
import path from 'path'

module.exports = {
  async getAll (ctx, next) {
      let condition = ctx.request.query // 根据状态获取相应的留言
      console.log('----------------获取留言 message/list-----------------------');   
      try {
          let data = await ctx.find(messageModel, condition, 'name content');
          ctx.send(data)
      }catch (e){
          console.log(e)
          ctx.sendError(e)
      }
      
  },
  async put (ctx, next) {
      console.log('----------------添加留言 message/add-----------------------');
      let paramsData = ctx.request.body;
      console.log(paramsData)
      try {
          let data = await ctx.add(messageModel, paramsData);
          ctx.send(data)   
      }catch(e) {
          ctx.sendError(e)
      }
  },

  async update (ctx, next) {
      console.log('----------------更新留言 message/update-----------------------');
      let id = ctx.params.id
      let paramsData = ctx.request.body
      try {
          let data = await ctx.update(tagModel, {_id: id}, paramsData)
          ctx.send()
      }catch(e) {
          if (e === '暂无数据') {
              ctx.sendError(e)
          }
      }
  },

  async delete (ctx, next) {
      console.log('----------------删除留言 message/del-----------------------');
      let id = ctx.params.id
      try {
          ctx.remove(messageModel, {_id: id})
          ctx.send()
      }catch(e){
          ctx.sendError(e)
      }
  }
}