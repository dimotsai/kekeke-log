import React, {Component, PropTypes} from 'react';
import MessageItem from './MessageItem';
import {List} from 'material-ui/List';
import InfiniteScroll from 'redux-infinite-scroll';
import CircularProgress from 'material-ui/CircularProgress';

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchMessages();
  }

  loadMore() {
    this.props.actions.fetchMessages();
  }

  renderMessages() {
    const {messageApp, actions} = this.props;
    return messageApp.messages.map(message =>
      <MessageItem key={message._id} message={message} actions={actions}/>
    );
  }

  renderLoader() {
    return (
      <div style={{textAlign: 'center', margin: 10}}>
        <CircularProgress/>
      </div>
    );
  }

  render() {
    const {messageApp} = this.props;
    return (
      <section className="main">
        <List className="message-list">
          <InfiniteScroll
            containerHeight="100%"
            items={this.renderMessages()}
            loadMore={this.loadMore}
            hasMore={messageApp.hasMore}
            loadingMore={messageApp.isFetching}
            loader={this.renderLoader()}
            />
        </List>
      </section>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  messageApp: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
