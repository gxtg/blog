/**
 * 留言块还未实现，先放这里以后再来弄
 */

import db from '../mongodb'

const Schema = db.Schema

const messageSchema = new Schema({
  name: String,
  content: String,
  state: {
    type: Number,
    default: 0
  }, // 0 待审核， 1 审核通过， 2 审核不通过
  createTime: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false,
  skipVersioning: {
      tags: true
  }
})

messageSchema.set('toJSON', {
  getters: true,
  virtuals: true
}
)
messageSchema.set('toObject', {
  getters: true,
  virtuals: true
})
messageSchema.path('createTime').get(function (v) {
    return utils.formatDate(new Date(v), 'yyyy-MM-dd hh:mm:ss')
})

export default db.model('message', messageSchema)