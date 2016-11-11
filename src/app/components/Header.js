import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from './Menu';
import {connect} from 'react-redux';
import * as Actions from '../actions/index';
import {bindActionCreators} from 'redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
  }

  handleCloseMenu() {
    this.props.actions.closeMenu();
  }

  handleOpenMenu() {
    this.props.actions.openMenu();
  }

  render() {
    return (
      <header className="header">
        <AppBar
          title="Kekeke Log"
          className="header"
          onLeftIconButtonTouchTap={this.handleOpenMenu}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        <Menu open={this.props.menu.open} actions={this.props.actions}/>
      </header>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    menu: state.menu
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
