/**
 * @file
 * @author 何文林
 * @date 17/1/16
 */
import React from 'react';
import {browserHistory} from 'react-router';
import Ajax from '../utility/ajax1';
import Config from '../utility/config';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange (name, e) {
    this.state[name] = e.target.value;
  }
  handleLogin () {
    const self = this;
    Ajax(Config.server + 'login', 'POST', {
      user: self.state.username,
      password: self.state.password
    }).then((data) => {
      if (data.status) {
        window.emitter.emit('login', {
          nickname: data.nickname,
          id: data.id
        });
        sessionStorage.setItem('loginuser', JSON.stringify(data));
        browserHistory.push('/');
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
            <h3 className="panel-title">登录</h3>
          </div>
          <div className="panel-body">
            <form role="form">
              <div className="form-group">
                <label for="username">用户名</label>
                <input type="email" className="form-control" id="username"
                       placeholder="请输入用户名"
                       onChange = {this.handleChange.bind(this, 'username')}
                />
              </div>
              <div className="form-group">
                <label for="password">密码</label>
                <input type="password" className="form-control" id="password"
                       placeholder="请输入密码"
                       onChange = {this.handleChange.bind(this, 'password')}
                />
              </div>
              <button type="button" className="btn btn-primary sub" onClick = {this.handleLogin.bind(this)}>提交</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}