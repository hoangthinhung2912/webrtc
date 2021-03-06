import io from 'socket.io-client';
import { SOCKET_URL } from 'config';
import * as service from './service';

import {
  RoomTypes,
  ParticipantsTypes,
  ParticipantsEnhancerTypes
} from 'actions';

const roomMiddleware = store => {
  let socket = null;

  return next => action => {
    if (action.type === RoomTypes.CONNECT_SOCKET) {
      socket = io(SOCKET_URL);

      socket.on('connect', () => service.connect(store, socket.id));

      socket.on('peer:msg', (data) => {
        service.handlePeerMsg(store, data);
      });

      socket.on('participant:msg', (data) => {
        service.handleParticipantMsg(store, data);
      });

      socket.on('peer:connected', (data) => {
        service.handlePeerConnected(store, data);
      });

      socket.on('peer:disconnecting', (data) => {
        service.handlePeerDisconnecting(store, data);
      });
    }

    if (socket) {
      if (action.type === ParticipantsTypes.GET_USER_MEDIA) {
        service.getUserMedia(store, action.payload.constrains);
      }

      if (action.type === ParticipantsTypes.GET_SHARE_SCREEN) {
        service.getShareScreen(store);
      }

      if (action.type === ParticipantsEnhancerTypes.ENHANCER_SET_STREAM) {
        service.setStream(store, action.payload.stream);
      }

      if (action.type === ParticipantsTypes.CLOSE_SHARE_SCREEN) {
        service.closeShareScreen(store);
      }

      if (action.type === ParticipantsTypes.SET_LOCAL_SETTING_DEVICES) {
        socket.emit('participant:msg', {
          from: action.payload.participantId,
          to: 'all',
          type: 'setting-devices',
          settings: action.payload.settings
        });
      }

      if (action.type === RoomTypes.JOIN_ROOM) {
        socket.emit('user:join-room', action.payload.roomName);
      }

      if (action.type === ParticipantsTypes.SOCKET_MSG) {
        socket.emit('participant:msg', action.payload.data);
      }

      if (action.type === RoomTypes.SOCKET_MSG) {
        socket.emit('peer:msg', action.payload.data);
      }
    } else {
      console.error('socket hasnt created yet!!!', action);
    }

    next(action);
  };
};

export default roomMiddleware;