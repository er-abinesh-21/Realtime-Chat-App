import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css'; // Import your CSS styles

const socket = io('http://localhost:5000');

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A component that renders a chat interface, allowing users to join a room and send messages
 * to each other in real-time.
 *
 * @returns {JSX.Element}
 */
/******  ea376043-0602-45ce-b0ab-43de33b67291  *******/const Chat = () => {
    const [roomId, setRoomId] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isJoined, setIsJoined] = useState(false); // Track if user has joined the room

    useEffect(() => {
        socket.on('receiveMessage', ({ message, timestamp }) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { message, timestamp, sender: 'other' }, // Mark as received message
            ]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const joinRoom = () => {
        if (roomId) {
            socket.emit('joinRoom', { roomId });
            setMessages([]); // Clear previous messages
            setIsJoined(true); // Set joined state to true
        }
    };

    const sendMessage = () => {
        if (messageInput && roomId) {
            const messageData = { roomId, message: messageInput };

            socket.emit('sendMessage', messageData);
            setMessages((prevMessages) => [
                ...prevMessages,
                { message: messageInput, timestamp: new Date().toLocaleTimeString(), sender: 'me' }, // Mark as sent message
            ]);
            setMessageInput(''); // Clear the input after sending
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="chat-container">
            <div className="header">
                <p className='room'>Room ID: {roomId}</p>
            </div>
            {!isJoined ? (
                <div className="join-room">
                    <input className='input'
                        type="text"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Enter Room ID"
                    />
                    <button className='button' onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <span className="text">
                                    {msg.message} <small className="text-muted">{msg.timestamp}</small>
                                </span>
                            </div>
                        ))}
                    </div>

                    
                    <input className='message-input'
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <br/>

                    <div className="footer">
                    <button className='send' onClick={sendMessage}>Send</button>  <br/>
                    <button className='clearchat' onClick={clearChat}>Clear Chat</button>
                    </div>
                    

                </>
            )}
        </div>
    );
};

export default Chat;
