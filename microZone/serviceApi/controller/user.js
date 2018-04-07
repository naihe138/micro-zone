/**
 * @file
 * @author 何文林
 * @date 17/1/20
 */

const User = require('../model/userModel');
const user = new User();

const login = function *(){
  const self = this;
  const cxt = self.request.body;
  let result = {};
  if (cxt.user == '' || cxt.password == '') {
    return this.body = {
      status: false,
      errMsg: '用户名或者密码不能为空！'
    };
  }
  const findUser = yield user.findOne({user: cxt.user});
  if (findUser) {
    const isMatch = yield findUser.comparePassword(cxt.password, function (isMatch) {
      return isMatch;
    });
    if (isMatch) {
      self.cookies.set('user', findUser._id)
      result.status = true;
      result.message = '登录成功';
      result.nickname = findUser.nickname;
      result.id = findUser._id;
    } else {
      result.status = false;
      result.message = '密码错误';
    }
  } else {
    result.status = false;
    result.message = '用户不存在！';
  }
  this.body = result;
};

const logout = function *() {
  // delete this.session.user;
  this.body = {
    message: '退出成功',
    status: true
  };
};

const signup = function *(){
  const self = this;
  const cxt = self.request.body;
  if (cxt.user == '' || cxt.nickname == '' || cxt.password == '') {
    this.body = {
      status: false,
      errMsg: '用户名、昵称或者密码不能为空！'
    };
    return;
  }
  yield user.findOne({user: cxt.user}).then(function (doc) {
    console.log(doc);
    if(doc && doc.length > 0){
      self.body = {
        message: '用户已经存在！',
        status: false,
        data: {
          user: doc.user,
          nickname: doc.nickname
        }
      };
    } else {
      return user.save(cxt);
    }
  }).then(function (doc) {
    if (doc) {
      self.body = {
        message: '注册成功！',
        status: true,
      };
    }
  })
};

const getUser = function *(){
  console.log(this.session.user);
  if(this.session.user) {
    this.body = this.session.user;
  } else {
    this.body = {
      status: false,
      message: '用户没登录'
    };
  }
};

const ddd = function *(){
  var n = this.session.views || 0;
  this.body = n;
};

module.exports = {
  login,
  signup,
  logout,
  getUser,
  ddd
};