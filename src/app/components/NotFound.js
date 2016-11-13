import React, {Component} from 'react';
import {Link} from 'react-router';
import {FlatButton} from 'material-ui';

export default class NotFound extends Component {
  render() {
    return (
      <section className="main" style={{textAlign: 'center'}}>
        <div>
          <h2>Oops!</h2>
          <h3 style={{marginTop: 0}}>This page doesn't exist!</h3>
          <img src="http://imgur.com/ZXd3KyM.png"/>
          <div>
            <Link to="/">
              <FlatButton label="Back Home"/>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
