const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = User = model('user', UserSchema)
