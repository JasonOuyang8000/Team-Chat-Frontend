import socketio from "socket.io-client";

import { createContext } from "react";

export const socket = socketio.connect(process.env.REACT_APP_URL, { query: {usertoken: localStorage.getItem('usertoken')}});
export const SocketContext = createContext();