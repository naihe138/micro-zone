/**
 * @file
 * @author 何文林
 * @date 17/1/20
 */

const TopicMode = require('../model/topicModel');
const topic = new TopicMode();

const addTopic = function *(){
  const self = this;
  const cxt = self.request.body;
  /*
  console.log(self.session);
  if (!self.session.user) {
    return this.body = {
      status: false,
      message: '请先登录'
    };
  }
  */
  if (cxt.content == '') {
    return this.body = {
      status: false,
      message: '内容不能为空'
    };
  }
  let options = {
    user: cxt.id,
    content: cxt.content
  };
  const newTopic = yield topic.save(options);
  if (newTopic) {
    this.body = {
      status: true,
      message: '发表成功'
    };
  } else {
    this.body = {
      status: false,
      message: '发表失败'
    };
  }
};

const topicList = function *(){
  console.log(this.query);
  let limt = 5;
  let page = this.query.page || 0;
  let num = limt * page;
  const list = yield topic.queryAll(limt, num);
  this.body = {
    status: true,
    data: list
  };
};
// 添加评论
const commentAdd = function *(){
  const prams = this.request.body;
  console.log(prams);
  const Topic = yield topic.update({_id: prams.topicId}, {
    $push: {
      comments: {
        from: prams.from,
        to: prams.to,
        content: prams.content
      }
    }
  });
  let ret = {};
  if (Topic.ok) {
    ret.status = true;
    ret.message = '评论成功'
  } else {
    ret.status = false;
    ret.message = '评论失败';
  }
  this.body = ret;
};

const topicCount = function *(){
  const listCount = yield topic.queryCount();
  let count = Math.ceil(listCount / 5);
  this.body = {
    status: true,
    allPage: count
  };
};

const eee = function *(){
  // session测试
  var n = this.session.views || 0;
  this.session.views = ++n;
  this.body = this.session;
};

module.exports = {
  addTopic,
  topicList,
  commentAdd,
  topicCount,
  eee
};