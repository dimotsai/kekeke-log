import * as types from '../constants/ActionTypes';

function images(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_IMAGES:
      return state.concat(action.images);
    default:
      return state;
  }
}

const initialState = {
  timestamp: Date.now(),
  offset: 0,
  limit: 25,
  hasMore: true,
  isFetching: false
};

export default function imageApp(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_IMAGES:
      return {
        ...state,
        isFetching: true
      };
    case types.RECEIVE_IMAGES:
      return {
        ...state,
        isFetching: false,
        offset: state.offset + state.limit,
        images: images(state.images, action)
      };
    default:
      return {
        ...state,
        images: images(state.images, action)
      };
  }
}
