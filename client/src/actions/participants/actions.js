import * as ActionTypes from './constants';

export const initLocalUser = (config) => {
  return {
    type: ActionTypes.INIT_LOCAL_USER,
    payload: {
      ...config
    }
  };
};

export const setLocalStream = (localUserId, fakeStream) => {
  return {
    type: ActionTypes.SET_LOCAL_STREAM,
    payload: {
      localUserId,
      stream: fakeStream
    }
  };
};

export const setRemoteStream = (remoteUserId, fakeStream) => {
  return {
    type: ActionTypes.SET_REMOTE_STREAM,
    payload: {
      remoteUserId,
      stream: fakeStream
    }
  };
};