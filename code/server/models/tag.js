import db from '../mongodb'

const Schema = db.Schema

const tagSchema = new Schema({
  name: String
}, {
  versionKey: false
})

export default db.model('tag', tagSchema)