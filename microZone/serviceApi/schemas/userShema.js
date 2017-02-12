/**
 * @file
 * @author 何文林
 * @date 17/1/17
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: {
    unique: true,
    type: String
  },
  nickname: String,
  password: String,
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

UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    })
  })
});

UserSchema.methods = {
  comparePassword: function(_password) {
    const self = this;
    return new Promise(function (resolve, reject) {
      bcrypt.compare(_password, self.password, function(err, isMatch) {
        if (err) reject(err);
        resolve(isMatch)
      })
    })
  }
};

module.exports = mongoose.model('User', UserSchema);