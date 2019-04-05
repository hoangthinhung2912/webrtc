import { combineReducers } from 'redux';
import { ParticipantsTypes } from 'actions';

const INIT_USER = {
  id: null,
  peerConnection: null,
  localStream: null,
  settings: {
    video: {
      active: false,
      enable: false,
    },
    audio: {
      active: false,
      enable: false,
    }
  }
};

const INITIAL_STATE = {
  byId: {},
  allIds: [],
  localUser: null,
  appState: {
    selectedUser: null,
    didGetUserMedia: false,
  }
};

const byId = (state = INITIAL_STATE.byId, { type, payload }) => {
  switch (type) {
    case ParticipantsTypes.INIT_LOCAL_USER:
      return {
        [payload.id]: {
          ...INIT_USER,
          ...payload
        }
      };

    case ParticipantsTypes.SET_LOCAL_STREAM:
      return {
        ...state,
        [payload.localUserId]: {
          ...state[payload.localUserId],
          localStream: payload.stream
        }
      };

    case ParticipantsTypes.SET_REMOTE_STREAM:
    return {
      ...state,
      [payload.remoteUserId]: {
        ...state[payload.remoteUserId],
        localStream: payload.stream
      }
    };
    default:
      return state;
  }
};

const allIds = (state = INITIAL_STATE.allIds, { type, payload }) => {
  switch (type) {
    case ParticipantsTypes.INIT_LOCAL_USER:
      return [payload.id];
    default:
      return state;
  }
};

const localUser = (state = INITIAL_STATE.localUser, { type, payload }) => {
  switch (type) {
    case ParticipantsTypes.INIT_LOCAL_USER:
      return payload.id;
    default:
      return state;
  }
};

const appState = (state = INITIAL_STATE.appState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
  localUser,
  appState
});
