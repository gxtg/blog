import draftModel from '../models/draft'
import path from 'path'
import marked from 'marked'

marked.setOptions({
    renderer: new marked.Renderer(),
    renderer: new marked.Renderer(),
    gfm: true, //允许 Git Hub标准的markdown.
    tables: true, //允许支持表格语法。该选项要求 gfm 为true。
    breaks: true, //允许回车换行。该选项要求 gfm 为true。
    pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
    sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
    smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
})

module.exports = {
    async getList (ctx, next) {
        console.log('----------------获取草稿 draft/list-----------------------');
        // let {offset = 0, limit = 8} = ctx.request.query;
        let { keyword, offset = 0, limit = 8} = ctx.request.query;
        console.log(ctx.request.query)
        let condition // 查询条件，没有关键字就全局查询
        if (keyword) {
            condition = {
                $or: [
                    {tags: {$in: [keyword]}}, 
                    {title: {$in: [keyword]}}
                ], 
                draftPublished: false
            }// keyword关键子查询,可以以标题或者tag
        } else {
            condition = {draftPublished: false} 
        } 
        try {
            let data = await ctx.findPage(
                draftModel,
                condition,
                'title lastEditTime excerpt', 
                {limit: limit*1, skip: offset*limit, sort: {lastEditTime: -1}},
                {path: 'tags', select: 'name'}
            )
            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }
        
    },

    async getOne (ctx, next) {
        console.log('-------------------获取草稿内容 draft/draft ---------------------');
        let id = ctx.params.id
        try {
            let data = await ctx.findOne(
                draftModel, 
                {_id: id}, 
                'title tags lastEditTime content',
                {path: 'tags', select: 'name'}
            )
            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }
    },

    async put (ctx, next) {
        console.log('----------------添加草稿 draft/add-----------------------')
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(
                    draftModel, 
                    {title: paramsData.title}, 
                    null, 
                    ''
                )
            if (data) {
                ctx.sendError('数据已经存在, 请重新添加!')
            }else{
                let data = await ctx.add(draftModel, paramsData);
                ctx.send(data)
            }
        }catch(e) {
            ctx.sendError(e)
        }
    },

    async update (ctx, next) {
        console.log('----------------更新草稿 draft/update-----------------------');
        /* 
            get请求一般在ctx.query和ctx.params中
            post请求参数在ctx.require.body中
        */
        let id = ctx.params.id
        let paramsData = ctx.request.body  
        if (paramsData.content) {
            // 获取简介
            let contentArr = paramsData.content.split('<!-- start -->')
            if (contentArr[1]) {
                contentArr = contentArr[1].split('<!-- end -->')[0]
            }
            if (contentArr.length > 1) {
                paramsData.excerpt = marked(contentArr)
            } else {
                paramsData.excerpt = ''
            }
            paramsData.lastEditTime = new Date()
        }
        paramsData.draftPublished = false // 只要有更新操作就更新发布状态
        try {
            let data = await ctx.update(
                    draftModel, 
                    {_id: id}, 
                    paramsData, 
                    {}
                )
            if (data.n != 0) {
                let arr = Object.keys(paramsData)
                paramsData = ''
                for (let i = 0; i < arr.length; i++) {
                    paramsData += (arr[i] + ' ')   
                }
                let data = await ctx.findOne(
                    draftModel, 
                    {_id: id}, 
                    paramsData, 
                    {path: 'tags', select: 'name'}
                )
                console.log(data)
                ctx.send(data)
            } else {
                ctx.sendError('数据更新失败')
            }
        }catch(e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },

    async delete (ctx, next) {
        console.log('----------------删除博客 draft/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(draftModel, {_id: id})
            ctx.send(data)
        }catch(e){
            ctx.sendError(e)
        }
    }
}