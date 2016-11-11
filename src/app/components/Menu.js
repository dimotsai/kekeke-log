import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {withRouter} from 'react-router';

class LinkedMenuItem extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap() {
    this.props.onTouchTap(this.props.path);
  }

  render() {
    return <MenuItem onTouchTap={this.handleTouchTap}>{this.props.children}</MenuItem>;
  }
}

LinkedMenuItem.defaultProps = {
  onTouchTap() {}
};

LinkedMenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  onTouchTap: PropTypes.func,
  children: PropTypes.any
};

class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  handleClick(path) {
    this.props.router.push(path);
    this.props.actions.closeMenu();
  }

  handleRequestChange(open) {
    if (open) {
      this.props.actions.openMenu();
    } else {
      this.props.actions.closeMenu();
    }
  }

  render() {
    const items = {
      Messages: '/messages',
      Images: '/images'
    };

    return (
      <Drawer
        open={this.props.open}
        docked={false}
        onRequestChange={this.handleRequestChange}
        >
        {Object.keys(items).map(text =>
          <LinkedMenuItem key={text} path={items[text]} onTouchTap={this.handleClick}>{text}</LinkedMenuItem>
        )}
      </Drawer>
    );
  }
}

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default withRouter(Menu);
