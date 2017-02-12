import React from 'react';
import {Link} from 'react-router';
import Config from '../utility/config';
import Ajax from '../utility/ajax1';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: false
    };
  }
  componentDidMount() {
    window.emitter.on('login', (data) => {
      this.setState({user: data});
    });
    this.getUser();
  }
  getUser () {
    /*
    Ajax(Config.server + 'getUser', 'GET', '').then((data) => {
      if (data.status) {
        self.setState({user: data});
      } else {
        self.setState({user: false});
      }
    }).catch((e) => {
      console.log(e);
    })
    */
    const loginuser = sessionStorage.getItem('loginuser') ? JSON.parse(sessionStorage.getItem('loginuser')) : null;
    if (loginuser) {
      this.setState({user: {
        nickname: loginuser.nickname,
        id: loginuser.id
      }});
    } else {
      this.setState({user: false});
    }
  }
  handelLogout () {
    /*
    const self = this;
    Ajax(Config.server + 'logout', 'GET', '').then((data) => {
      if (data.status) {
        self.setState({user: false});
      } else {
        alert(data.message);
      }
    }).catch((e) => {
      console.log(e);
    })
    */
    sessionStorage.removeItem('loginuser');
    this.setState({user: false});
  }
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">微说说</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/">首页</Link>
              </li>
              {
                this.state.user
                ? <li><Link to="/new"><i className="glyphicon glyphicon-plus"></i> 发表说说</Link></li>
                : null
              }
            </ul>
            {
              this.state.user
              ? <ul className="nav navbar-nav navbar-right">
                  <li><a href="javascript: void(0)">欢迎({this.state.user.nickname})</a></li>
                  <li><a href="javascript: void(0)" onClick={this.handelLogout.bind(this)}>注销</a></li>
                </ul>
              : <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/login">登录</Link></li>
                  <li><Link to="/signup">注册</Link></li>
                </ul>
            }
          </div>
        </div>
      </nav>
    )
  }
}
