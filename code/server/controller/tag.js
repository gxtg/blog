import tagModel from '../models/tag'
import draftModel from '../models/draft'
import path from 'path'

module.exports = {
    async getAll (ctx, next) {
        console.log('----------------获取标签 tag/list-----------------------');
        let { keyword } = ctx.request.query; 
          console.log('keyword:'+keyword)
          let condition = {name: ''} // 查询条件，没有关键字就全局查询
          if (keyword !== '') {
              let reg = new RegExp(keyword, 'i')
              condition = { name: { $regex: reg }} // keyword关键子查询,模糊查询
          }

        try {
            let data = await ctx.find(tagModel, condition, {});
            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }

    },
    async put (ctx, next) {
        console.log('----------------添加标签 draft/add-----------------------');
        let paramsData = ctx.request.body;
        console.log(paramsData)
        try {
            let data = await ctx.findOne(tagModel, {name: paramsData.name}, {}, '')
            if (data) {
                ctx.send(data,'data is existed in tagModel')
            }else{
                let data = await ctx.add(tagModel, paramsData);
                ctx.send(data)
            }
        }catch(e) {
            ctx.sendError(e)
        }
    },

    async update (ctx, next) {
        console.log('----------------更新标签 blog/update-----------------------');
        let id = ctx.params.id
        let paramsData = ctx.request.body;
        console.log(ctx.params)
        console.log(paramsData)
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
        console.log('----------------删除标签 blog/del-----------------------');
        let id = ctx.params.id
        try {
            ctx.remove(tagModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    },

    async classify(ctx, next) {
      console.log('----------------标签归档 tag-classify-----------------------');
      try {
            let tag = await ctx.find(tagModel, null, {})
            if (tag) {
                const tagClone = JSON.parse(JSON.stringify(tag)) // 解析查询结果，这步很重要
                let data = await draftModel.aggregate([
                    {$match: {draftPublished: true} },
                    {$unwind: "$tags"},
                    {
                        $group: {
                            _id: "$tags",
                            num_total: {$sum: 1}
                        }
                    }
                ])
                if (data) {
                    tagClone.forEach(t => {
                        let finded = data.find(c => c._id == t._id || t.id)
                        t.count = finded ? finded.num_total : 0
                    })
                    ctx.send(tagClone)
                } else {
                    ctx.sendError('获取内容失败')  
                }     
            } else {
                ctx.sendError('获取标签失败')
            }      
        }catch(e) {
            ctx.sendError(e)
        }
    } 
}   