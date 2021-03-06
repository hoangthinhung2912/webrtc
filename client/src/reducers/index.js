import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import room from './room/store';
import participants from './participants/store';
import uiState from './uiState/store';
import devices from './devices/store';

export default combineReducers({
  routing,
  room,
  participants,
  uiState,
  devices,
  lastActionType: (state, action) => action.type
});

export { default as patricipantsEnhancer } from './participants/enhancer/store';
export { default as participantsListener } from './participants/enhancer/listener';
export { default as roomMiddleware } from './room/middleware';