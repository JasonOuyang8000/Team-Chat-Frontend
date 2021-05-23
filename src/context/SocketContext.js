import socketio from "socket.io-client";

import { createContext } from "react";

export const socket = socketio.connect(process.env.REACT_APP_URL);
export const SocketContext = createContext();