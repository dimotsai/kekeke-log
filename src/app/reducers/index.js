import {combineReducers} from 'redux';
import todos from './todos';
import messageApp from './messageApp';

const rootReducer = combineReducers({
  todos,
  messageApp
});

export default rootReducer;
