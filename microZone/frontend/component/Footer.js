import React from 'react';

const footerStyle = {
  marginTop: 50,
  padding: 20,
};

export default class Footer extends React.Component {
  render() {
    return (
      <div className="text-center" style={footerStyle}>
        &copy; CopyRight 微说说
      </div>
    )
  }
}
