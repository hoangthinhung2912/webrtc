import { combineReducers } from 'redux';
import { RoomTypes, UsersTypes } from 'actions';

const INITIAL_STATE = {
  roomName: '',
  users: {
    me: null,
    others: null
  }
};

const roomName = (state = INITIAL_STATE.roomName, { type, payload }) => {
  switch (type) {
    case RoomTypes.JOIN_ROOM:
      return payload.roomName;
    default:
      return state;
  }
}

const users = (state = INITIAL_STATE.users, { type, payload }) => {
  switch (type) {
    case UsersTypes.INIT_LOCAL_USER:
      return {
        me: payload.id,
        others: []
      }
    default:
      return state;
  }
}

export default combineReducers({
  roomName,
  users
});