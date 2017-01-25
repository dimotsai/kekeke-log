import * as types from '../constants/ActionTypes';
import request from 'superagent';

const baseUrl = '//dimotsai.me/cq/api';

export function addTodo(text) {
  return {type: types.ADD_TODO, text};
}

export function deleteTodo(id) {
  return {type: types.DELETE_TODO, id};
}

export function editTodo(id, text) {
  return {type: types.EDIT_TODO, id, text};
}

export function completeTodo(id) {
  return {type: types.COMPLETE_TODO, id};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

function requestMessages() {
  return {
    type: types.REQUEST_MESSAGES
  };
}

function receiveMessages(body) {
  return {
    type: types.RECEIVE_MESSAGES,
    messages: body.items,
    count: body.count
  };
}

export function fetchMessages() {
  return (dispatch, getState) => {
    const {messageApp} = getState();
    if (!messageApp.isFetching) {
      const beginging = messageApp.beginging;
      const limit = messageApp.limit;
      const order = 'desc';
      if (messageApp.hasMore) {
        dispatch(requestMessages());
        return request.get(`${baseUrl}/messages`)
          .query({before: beginging - 1, limit, order})
          .then(res => dispatch(receiveMessages(res.body)))
          .catch(e => console.error(e.message));
      }
    }
  };
}

export function openMenu() {
  return {type: types.OPEN_MENU};
}

export function closeMenu() {
  return {type: types.CLOSE_MENU};
}

export function toggleMenu() {
  return {type: types.TOGGLE_MENU};
}

function requestImages() {
  return {
    type: types.REQUEST_IMAGES
  };
}

function receiveImages(body) {
  return {
    type: types.RECEIVE_IMAGES,
    images: body.items,
    count: body.count
  };
}

export function fetchImages() {
  return (dispatch, getState) => {
    const {imageApp} = getState();
    if (!imageApp.isFetching) {
      dispatch(requestImages());
      return request.get(`${baseUrl}/images`)
        .query({timestamp: imageApp.timestamp, offset: imageApp.offset, limit: imageApp.limit})
        .then(res => dispatch(receiveImages(res.body)));
    }
  };
}

