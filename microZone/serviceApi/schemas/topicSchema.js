/**
 * @file
 * @author 何文林
 * @date 17/1/20
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TopicSchema = new Schema({
  content: String,
  user: {
    type: ObjectId,
    ref: 'User',
    index: true
  },
  comments: [{
    from: {type: ObjectId, ref: 'User'},
    to: {type: ObjectId, ref: 'User'},
    content: String,
    createdAt: {
      type: Date,
      default: Date.now()
    },
  }],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

TopicSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
    this.meta.updateAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Topic', TopicSchema);