import draftModel from '../models/draft'
import tagModel from '../models/tag'
import path from 'path'

module.exports =  {
    async put(ctx, next) {
        console.log('----------------添加文章 draft/add-----------------------');
        let id = ctx.params.id
        try {
            let data = await ctx.findOne(draftModel, {_id: id}, 'draftPublished', '')
            console.log(data.draftPublished)
            if (data.draftPublished) {
                ctx.sendError('文章已经发布, 请不要重复发布!')
            }else{
                let data = await ctx.update(
                				    draftModel, 
                				    {_id: id},  
                                    {draftPublished: true},
                                    {}
                                )
                if (data.n != 0) {
                    ctx.send(data)
                } else {
                    ctx.sendError('数据更新失败')
                } 
            }
        }catch(e) {
            ctx.sendError(e)
        }
    },

    async getList (ctx, next) {
        console.log('----------------获取文章 article/list-----------------------');
        let { keyword, tag, offset = 0, limit = 8} = ctx.request.query;
        console.log(ctx.request.query)
        let condition
        let sort = {views: -1}
        if (tag) {
            let reg = new RegExp(tag, 'i')
            let data = await tagModel.findOne({name: { $regex: reg }}, '_id', (err, doc) => {
                if (err) {
                    return false;
                } else {
                    if (doc) {
                       return doc
                    } else {
                        return false
                    }
                }
            })
            if (data) {
                condition = {
                    tags: {$in: [data._id]},
                    draftPublished: true
                }
            } else {
                condition = { 
                    tags: {$in: [tag]},
                    draftPublished: true
                }
            }
            sort = {lastEditTime: -1}
        } 
        if (keyword) {
            let reg = new RegExp(keyword, 'i')  
            condition = {
                $or: [
                    {excerpt: { $regex: reg }}, 
                    {title: { $regex: reg }}
                ], 
                draftPublished: true
            }
        }
        try {
            let data = await ctx.findPage(
                draftModel, 
                condition,
                'title lastEditTime excerpt likes views', 
                {limit: limit*1, skip: offset*limit, sort: sort},
                {path: 'tags', select: 'name'}
            )
            console.log(data)
            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }
        
    },

    async getOne (ctx, next) {
        console.log('-------------------获取文章内容 draft/draft ---------------------');
        let id = ctx.params.id
        try {
            let data = await ctx.findOne(
                draftModel, 
                {_id: id}, 
                'title tags lastEditTime content views likes', 
                {path: 'tags', select: 'name'}
            )
            if (data) {
                data.views += 1
                let metaData = data.views
                await ctx.update(
                    draftModel, 
                    {_id: id},  
                    {views: metaData},
                    {}
                )
            }
            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }
    },

    async addLike(ctx, next) {
        console.log('----------------添加文章like数 article-like/add-----------------------');
        let id = ctx.params.id
        try {
            let metaData = await ctx.findOne(draftModel, {_id: id}, 'likes', '')
            metaData.likes += 1
            console.log(metaData)
            let data = await ctx.update(
            				    draftModel, 
            				    {_id: id},  
                                metaData,
                                {}
                            )
            if (data.n != 0) {
                ctx.send(data)
            } else {
                ctx.sendError('数据更新失败')
            } 
        }catch(e) {
            ctx.sendError(e)
        }
    },

    async classify(ctx, next) {
        console.log('----------------文章归档 article-classify-----------------------');
        try {
            let data = await draftModel.aggregate([
               {$match: { draftPublished: true }},
               {
                   $project: {
                       year: {$year: '$lastEditTime'},
                       month: {$month: '$lastEditTime'},
                       title: 1,
                       lastEditTime: 1
                   }
               },
               {
                    $group: {
                        _id: {
                            year: '$year',
                            month: '$month'
                        },
                        article: {
                            $push: {
                                title: '$title',
                                _id: '$_id',
                                lastEditTime: '$lastEditTime'
                            }
                        }
                    }
                }
            ])
            if (data) {
                const yearList = [...new Set(data.map(item => item._id.year))]
                   .sort((a, b) => b - a)
                   .map(item => {
                        const monthList = []
                        data.forEach(n => {
                          // 同一年
                          if (n._id.year === item) {
                            monthList.push({ month: n._id.month, dataList: n.article.reverse() })
                          }
                        })
                        return { year: item, monthList: monthList.sort((a, b) => b.month - a.month) }
                    })
                ctx.send(yearList)
            } else {
              ctx.sendError('获取内容失败')  
            }     
        }catch(e) {
            ctx.sendError(e)
        }
    } 
}   