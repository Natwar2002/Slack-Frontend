import { createContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

    const socket = io('http://localhost:3000');

    return (
        <SocketContext.Provider value={{ socket }}>
            { children }
        </SocketContext.Provider>
    );
};

export default SocketContext;