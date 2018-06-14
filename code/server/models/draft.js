import db from '../mongodb'

const Schema = db.Schema

const draftSchema = new Schema({
    type: Number,
    title: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    excerpt: String,
    content: String,
    views: {type: Number, default: 0},
    likes: { type: Number, default: 0 },
    draftPublished: {type: Boolean, default: false}
}, {
    versionKey: false,
    skipVersioning: { tags: true }
})

draftSchema.set('toJSON', {
    getters: true,
    virtuals: true
})
draftSchema.set('toObject', {
    getters: true,
    virtuals: true
})
    
export default db.model('draft', draftSchema)