/**
 * @file
 * @author 何文林
 * @date 17/1/20
 */
const topicModel = require('../schemas/topicSchema');
class Topic {
  constructor () {
    this.model = topicModel;
  }
  save (opts) {
    this.entity = new topicModel(opts);
    return this.entity.save();
  }
  findOne (opts) {
    return this.model.findOne(opts).exec();
  }
  update (slect, upt) {
    return this.model.update(slect, upt).exec();
  }
  queryAll (_limit, num) {
    return this.model.find({})
               .limit(_limit)
               .skip(num)
               .sort({'meta.createAt': -1})
               .populate('user', 'user nickname _id')
               .populate('comments.from', 'user nickname _id')
               .populate('comments.to', 'user nickname _id')
               .exec();
  }
  queryCount () {
    return this.model.find({}).count().exec();
  }
}

module.exports = Topic;