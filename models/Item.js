const { Schema, model } = require('mongoose')

const ItemSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'User field is required'],
    },
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = Item = model('item', ItemSchema)
