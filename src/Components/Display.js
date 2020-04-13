import React, { Component } from 'react';

class Pad extends Component {
  render() {
    return (
      <div id="display" className="display">
        {this.props.value}
      </div>
    );
  }
}

export default Pad;