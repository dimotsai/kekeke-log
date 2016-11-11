import * as types from '../constants/ActionTypes';

const initialState = {open: false};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_MENU:
      return {...state, open: true};
    case types.CLOSE_MENU:
      return {...state, open: false};
    case types.TOGGLE_MENU:
      return {...state, open: !state.open};
    default:
      return state;
  }
}
