import React from 'react';
import {Link} from 'react-router';
require('../static/style.css');
import Ajax from '../utility/ajax1';
import Config from '../utility/config';

export default class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      allpage: 0,
      listData: null,
      cTopicId: null,
      cUserId: null
    };
  }
  componentDidMount() {
    this.getList();
    this.getAllpage();
  }
  getList () {
    const self = this;
    Ajax(Config.server + 'topic/list', 'GET', {page: this.state.page}).then((data) => {
      if (data.status) {
        self.setState({
          listData: data.data
        })
      } else {
        alert(data.message);
      }
    }).catch((e) => {
      console.log(e);
    })
  }
  commentChange (name, e) {
    this.state[name] = e.target.value;
  }
  commentAdd () {
    const self = this;
    const loginuser = sessionStorage.getItem('loginuser') ? JSON.parse(sessionStorage.getItem('loginuser')) : null;
    console.log(loginuser);
    if (!loginuser) {
      alert('用户未登录');
      return;
    }
    Ajax(Config.server + 'topic/commentAdd', 'POST', {
      topicId: self.state.cTopicId,
      from: loginuser.id,
      to: self.state.cUserId,
      content: self.state.comment,
    }).then((data) => {
      if (data.status) {
        console.log(data);
        self.getList();
        $("#myModal").modal('hide');
      } else {
        alert(data.message);
      }
    }).catch((e) => {
      console.log(e);
    })
  }
  getTopicId (id, userid, e) {
    this.setState({
      cTopicId: id,
      cUserId: userid
    })
  }

  getAllpage () {
    const self = this;
    Ajax(Config.server + 'topic/topicCount', 'GET', '').then((data) => {
      if (data.status) {
        self.setState({
          allpage: data.allPage
        })
      } else {
        alert(data.message);
      }
    }).catch((e) => {
      console.log(e);
    })
  }

  nextpage () {
    let page = this.state.page;
    page++;
    if (page >= this.state.allpage) {
      alert('已经是最后一页');
      return;
    }
    console.log(page)
    this.setState({
      page: page
    }, function () {
      this.getList();
    });
  }

  prevpage () {
    console.log(this.state.page);
    let page = this.state.page;
    page--
    if (this.state.page <= 0) {
      alert('已经是地一页');
      return;
    }
    this.setState({
      page: page
    }, function () {
      this.getList();
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    let listData = this.state.listData;
    return (
      <div className="microZone">
        {
          listData
          ? <ul>
              {listData.map((item, i) => {
                return (
                  <li>
                    <div className="panel panel-info">
                      <div className="panel-heading">
                        <h3 className="panel-title">{item.user.nickname}发表了一条说说：
                          <button type="button" className="btn btn-primary btn-xs pull-right" data-toggle="modal" data-target="#myModal" onClick={this.getTopicId.bind(this, item._id, item.user._id)}>吐槽一下</button>
                        </h3>
                      </div>
                      <div className="panel-body">
                        {item.content}
                      </div>
                      <div className="panel-footer">
                        <ol className="comments">
                          {
                            item.comments.map(item2 => {
                              return (
                                <li>
                                  <p>
                                    <span className="text-primary">{item2.from.nickname}</span>
                                    &nbsp;对&nbsp;
                                    <span className="text-primary">{item2.to.nickname}</span>
                                    说：
                                    </p>
                                  <p className="commentText">{item2.content}</p>
                                </li>
                              )
                            })
                          }
                        </ol>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          : <div>正在加载-----</div>
        }
        <nav>
          <ul className="pager">
            <li className="previous"><a href="javascript:void(0)" onClick={this.prevpage.bind(this)}>&larr; 上一页</a></li>
            <li className="next"><a href="javascript:void(0)" onClick={this.nextpage.bind(this)}>下一页 &rarr;</a></li>
          </ul>
        </nav>

        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">评论框</h4>
              </div>
              <div className="modal-body">
                <textarea className="form-control" rows="3"
                          placeholder="请输出评论内容"
                          onChange={this.commentChange.bind(this, 'comment')}
                          ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" className="btn btn-primary" onClick={this.commentAdd.bind(this)}>提交</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
