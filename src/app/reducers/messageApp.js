import * as types from '../constants/ActionTypes';

function messages(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_MESSAGES:
      return state.concat(action.messages);
    default:
      return state;
  }
}

const initialState = {
  page: 0,
  messagesPerPage: 50,
  count: 1,
  isFetching: false,
  hasMore: true
};

export default function messageApp(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_MESSAGES: {
      const hasMore = (state.page + 1) * state.messagesPerPage < action.count;
      return Object.assign({}, state, {
        page: state.page + 1,
        isFetching: false,
        count: action.count,
        hasMore,
        messages: messages(state.messages, action)
      });
    }
    case types.REQUEST_MESSAGES:
      return Object.assign({}, state, {isFetching: true});
    default:
      return Object.assign({}, state, {
        messages: messages(state.messages, action)
      });
  }
}
