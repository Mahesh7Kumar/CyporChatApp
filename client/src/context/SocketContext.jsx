import { useAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';


const SocketContext = createContext(null);
export const useSocket = () => {
    return useContext(SocketContext);
}

// Socketprovider all backed to frontend communication will be enable
export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
            });
            socket.current.on('connect', () => {
                console.log("connected to socket Server")
            });


            // seperate message for the each user it recivie for back ]end socket
            const handleRecieveMessage = (message) => {
                const { selectedChatData, selectedChatType, addMessage, addChannelInChannelList, addContactsInDMContacts} = useAppStore.getState();

                if (selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id)
                ) {
                    console.log("Message rcv", message)
                    addMessage(message);
                }
                addChannelInChannelList(message);
                addContactsInDMContacts(message)
            };


            // for Channel Socket to recieveing the message
            const handleRecieveChannelMessage = (message) => {
                const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();

                if (selectedChatType !== undefined &&
                    selectedChatData._id === message.channelId
                ) {
                    addMessage(message);
                }
            };

            // this for the link the backend socket to frontend Socket by the "recieveMessage" and add the operation by the function
            socket.current.on('recieveMessage', handleRecieveMessage);
            socket.current.on('recieve-channel-message', handleRecieveChannelMessage);

            return () => {
                socket.current.disconnect();
            };
        }
    }, [userInfo]);

    //For enable the Socket routing by add
    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
};