import { handleActions } from 'redux-actions';
import io from 'socket.io-client';
import { closeSocket, connectSocket } from '../actions/socket';

const socket = io();
const onevent = socket.onevent;
socket.onevent = function (packet) {
  const args = packet.data || [];
  onevent.call(this, packet);
  onevent.call(this, {
    ...packet,
    data: ['*'].concat(args),
  });
};

export default handleActions({
  [connectSocket.SUCCESS]: (state, action) => state,
  [connectSocket.FAILURE]: (state, action) => state,
  [closeSocket.SUCCESS]: (state, action) => state,
}, socket);
