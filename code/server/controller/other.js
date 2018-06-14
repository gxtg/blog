const path = require('path');

module.exports = {
    async upload_img (ctx, next) {
        console.log('----------------添加图片 upload_img-----------------------');
        console.log(__dirname)
        let opts = {
            path: path.resolve(__dirname, '../../../public')
        }
        console.log(opts.path)
        let result = await ctx.uploadFile(ctx, opts)
        ctx.send(result)
    },

    async delete_img (ctx, next) {
        console.log('----------------删除图片 delete_img-----------------------');
        let id = './images/' + ctx.request.body.id
        let _path = path.resolve(__dirname, '../../../public')
        let opts = path.resolve(_path, id)
        console.log(opts)
        let result = await ctx.delFile(opts)
        ctx.send(result)
    }
}