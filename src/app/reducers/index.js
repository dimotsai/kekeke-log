import {combineReducers} from 'redux';
import messageApp from './messageApp';
import imageApp from './imageApp';
import menu from './menu';

const rootReducer = combineReducers({
  messageApp,
  imageApp,
  menu
});

export default rootReducer;
