/**
 * @file
 * @author 何文林
 * @date 17/1/16
 */
import React from 'react';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import Ajax from '../utility/ajax1';
import Config from '../utility/config';
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange (name, e) {
    this.state[name] = e.target.value;
  }
  componentDidMount() {

  }
  toSingup () {
    const self = this;
    Ajax(Config.server + 'signup', 'POST', {
      user: self.state.user,
      nickname: self.state.nickname,
      password: self.state.password
    }).then((data) => {
      if (data.status) {
        browserHistory.push('/login');
      } else {
        alert(data.message);
      }
    }).catch((e) => {
      console.log(e);
    })
  }
  componentWillReceiveProps(nextProps) {

  }
  render() {
    return (
      <div className="microZone signup">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">注册</h3>
          </div>
          <div className="panel-body">
            <form role="form">
              <div className="form-group">
                <label for="user">用户名</label>
                <input type="email" className="form-control" id="user" placeholder="请输入用户名"
                       onChange={this.handleChange.bind(this, 'user')} />
              </div>
              <div className="form-group">
                <label for="nickname">昵称</label>
                <input type="email" className="form-control" id="nickname" placeholder="请输入昵称"
                       onChange={this.handleChange.bind(this, 'nickname')}/>
              </div>
              <div className="form-group">
                <label for="password">密码</label>
                <input type="password" className="form-control" id="password" placeholder="请输入密码"
                       onChange={this.handleChange.bind(this, 'password')} />
              </div>
              <button type="button" className="btn btn-primary sub" onClick={this.toSingup.bind(this)}>提交</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}