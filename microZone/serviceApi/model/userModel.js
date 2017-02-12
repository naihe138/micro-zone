/**
 * @file
 * @author 何文林
 * @date 17/1/18
 */
const userModel = require('../schemas/userShema');
class User {
  constructor () {
    this.model = userModel;
  }
  save (opts) {
    this.entity = new userModel(opts);
    return this.entity.save();
  }
  findOne (opts) {
    return this.model.findOne(opts).exec();
  }
  queryAll () {
    return this.model.find({}).exec();
  }
  queryById (id) {
    return this.model.findById(id).exec();
  }
  remove (id, fn) {
    return this.model.findById(id).then(function (doc) {
      if (!doc) return fn(null, false);
      return doc.remove();
    })
  }
}

module.exports = User;