import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
import Peer from 'peerjs';

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';

const PeerChat = () => {
    const { store } = useContext(GlobalStoreContext);
    const peerInstance = useRef(null);

    const [peer, setPeer] = useState(null);
    const [peerId, setPeerId] = useState(store.username);
    const [remotePeerId, setRemotePeerId] = useState('');

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const initializePeer = async () => {
            const peerInstance = new Peer(store.username);

            peerInstance.on('open', () => {
                console.log('Connected with ID: ', peerInstance.id);
                setPeerId(peerInstance.id);
            });

            peerInstance.on('connection', (conn) => {
                // Handle incoming connections
                conn.on('data', (data) => {
                    setMessages((prevMessages) => [...prevMessages, {from: 'remote', text: data}]);
                });
            });

            setPeer(peerInstance);
        };

        initializePeer();

        // const peer = new Peer(store.username);

        // peer.on('open', (id) => {
        //     setPeerId(id);
        // });


        // peer.on('connection', (conn) => {
        //     // Handle incoming connections
        //     setConnection(conn);
        //     // remote peer receives new messages
        //     conn.on('data', (data) => {
        //         setMessages((prevMessages) => [...prevMessages, { from: 'remote', text: data }]);
        //     });
        // });

        // // establish peerInstance for use outside of useEffect
        // peerInstance.current = peer;

        // prevent mem leaks when unmounting
        return () => {
            if(peer) {
                peer.destroy();
            }
        };
    }, []); // end of useEffect (constantly listening for calls)


    const handleConnect = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const remoteId = formData.get("remotePeerChatId");
        setRemotePeerId(remoteId);
        // store.setRemotePeerId(remoteId);
        

        if(peer) {
            const conn = peer.connect(remoteId);
            setConnection(conn);

            conn.on('open', () => {
                console.log('Connected to remote peer ID: ', remoteId);
                setConnection(conn);
            });

            conn.on('data', (data) => {
                setMessages((prevMessages) => [...prevMessages, { from: 'remote', text: data }]);
            });

        
        }
          
    }

    const handleSendMessage = () => {
        if(connection) {
          connection.send(inputMessage);
          setMessages((prevMessages) => [...prevMessages, { from: 'local', text: inputMessage }]);
          setInputMessage('');
        }
    };

    return (
        <Box
            component="form" noValidate onSubmit={handleConnect}
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',        
            }}
        >
                   
            <Typography component="h3" variant="p1">
                Chat (Add attachments) 
            </Typography>
            <Typography component="h2" variant="h7">
                Peer Id: {peerId}
            </Typography> 
            <Typography component="h2" variant="h7">
                Remote PeerId: {remotePeerId}
            </Typography> 
            <TextField
                margin="normal"
                fullWidth
                id="remotePeerChatId"
                label="Enter Remote Peer Id"
                name="remotePeerChatId"
                autoComplete="remotePeerChatId"
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Connect
            </Button>
             <div>
                <ul sx={{backgroundColor: 'gray', listStyleType: 'none'}}>
                    {messages.map((message, index) => {
                        if(message.from === "local") {
                            
                        } 
                        return (<li key={index}>{message.from}: {message.text}</li>);
                    })}
                </ul>
            </div>
            <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </Box>
    );

}

export default PeerChat;