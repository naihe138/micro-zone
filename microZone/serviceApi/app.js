/**
 * @file 服务器首页
 * @author 何文林
 * @date 17/1/17
 */
const path = require("path");
const session = require('koa-session-store'); // or you can use 'koa-session-store'
const MongooseStore = require('koa-session-mongoose');
const mongoose = require('mongoose');
const koa = require('koa');
const app = koa();

const bcrypt = require('bcrypt');
const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const cors = require('koa-cors');
const router = require('koa-router')();


app.keys = ['microZone'];  // needed for cookie-signing


mongoose.connect('mongodb://localhost/micro-zone');
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('数据库已连接');
});


app.use(session({
  store: new MongooseStore({
    collection: 'koaSessions',
    connection: db,
    expires: 60 * 60 * 24 * 14, // 2 weeks is the default
    model: 'KoaSession'
  })
}));


app.use(cors({
 origin: true,
 credentials: true
}));
app.use(bodyParser());
app.use(logger());
app.use(responseTime());
app.use(router.routes());
app.use(router.allowedMethods());


const Users = require('./controller/user');
const Topic = require('./controller/topic');

// user
router.post('/login', Users.login);
router.get('/logout', Users.logout);
router.post('/signup', Users.signup);
router.get('/getUser', Users.getUser);
// topic
router.post('/topic/add', Topic.addTopic);
router.get('/topic/list', Topic.topicList);
router.post('/topic/commentAdd', Topic.commentAdd);
router.get('/topic/topicCount', Topic.topicCount);

router.get('/eee', Topic.eee);
router.get('/ddd', Users.ddd);


app.listen(3001);