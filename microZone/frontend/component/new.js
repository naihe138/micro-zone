/**
 * @file
 * @author 何文林
 * @date 17/1/17
 */
import React from 'react';
import {browserHistory} from 'react-router';
import Config from '../utility/config';
import Ajax from '../utility/ajax1';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange (name, e) {
    this.state[name] = e.target.value;
  }

  componentDidMount() {

  }

  toComment () {
    const self = this;
    const loginuser = sessionStorage.getItem('loginuser') ? JSON.parse(sessionStorage.getItem('loginuser')) : null;
    Ajax(Config.server + 'topic/add', 'POST', {
      content: self.state.content,
      id: loginuser.id
    }).then((data) => {
      if(data.status){
        browserHistory.push('/');
      } else {
        alert(data.message)
      }
    }).catch((e) => {
      console.log(e);
    })
  }

  render() {
    return (
      <div className="microZone newBox">
        <form role="form">
          <textarea className="form-control" rows="3" onChange={this.handleChange.bind(this, 'content')}></textarea>
          <button type="button" className="btn btn-primary" onClick={this.toComment.bind(this)}>提交</button>
        </form>
      </div>
    )
  }
}