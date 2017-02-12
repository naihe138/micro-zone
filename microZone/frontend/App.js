import React from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import Index from './component/index';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <Header/>
        {this.props.children ? this.props.children : <Index {...this.props} />}
        <Footer />
      </div>
    )
  }
}
