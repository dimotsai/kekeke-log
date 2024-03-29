import React, {Component, PropTypes} from 'react';
import Header from '../components/Header';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.any
};

export default connect()(App);
