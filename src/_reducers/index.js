import { combineReducers } from 'redux';

import { alert } from './alert';
import { users } from './users';

const rootReducer = combineReducers({
  alert,
  users
});

export default rootReducer;