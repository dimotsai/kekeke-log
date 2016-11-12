import * as types from '../constants/ActionTypes';

function images(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_IMAGES:
      return state.concat(action.images);
    default:
      return state;
  }
}

function loadedImages(state = [], action) {
  switch (action.type) {
    case types.LOAD_IMAGES:
      return state.concat(action.images);
    default:
      return state;
  }
}

const initialState = {
  downloaded: false,
  offset: 0,
  limit: 20,
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
        downloaded: true,
        images: images(state.images, action)
      };
    case types.LOAD_IMAGES:
      return {
        ...state,
        offset: state.offset + state.limit,
        loadedImages: loadedImages(state.loadedImages, action),
        hasMore: state.offset < state.images.length - 1
      };
    default:
      return {
        ...state,
        images: images(state.images, action),
        loadedImages: loadedImages(state.loadedImages, action)
      };
  }
}
