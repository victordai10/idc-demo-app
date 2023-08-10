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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const PeerChat = () => {
    const { store } = useContext(GlobalStoreContext);
    // const peerInstance = useRef(null);

    const [peer, setPeer] = useState(null);
    const [peerId, setPeerId] = useState(store.username);
    

    const rpid = store.remotePeerId;
    const [remotePeerId, setRemotePeerId] = useState(rpid);

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const initializePeer = async () => {
            const peerInstance = new Peer(peerId); //store.chatId

            peerInstance.on('open', () => {
                console.log('Connected with Chat ID: ', peerInstance.id);
                setPeerId(peerInstance.id);
            });

            peerInstance.on('connection', (conn) => {
                // Handle incoming connections
                console.log('UseEffect: setMessages in peerchat');
                conn.on('data', (data) => {
                    setMessages((prevMessages) => [...prevMessages, {from: store.remotePeerId || 'remote', text: data}]);
                });
            });

            setPeer(peerInstance);
        };

        initializePeer();

        
        
        // prevent mem leaks when unmounting
        return () => {
            if(peer) {
                peer.destroy();
            }
        };
    }, []); // end of useEffect (constantly listening for calls)


    // useEffect(() => {
    //     if(connection) {
    //         connection.on('open', () => {
    //             console.log('Connected to remote peer ID: ', remotePeerId); // instead of remoteId
    //         });

    //         connection.on('data', (data) => {
    //             console.log('sends messages within handleconnect');
    //             setMessages((prevMessages) => [...prevMessages, { from: store.remotePeerId, text: data }]);
    //         });

    //     }
        
    // }, [connection]);


    const handleConnect = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const remoteId = formData.get("remotePeerChatId");
        store.setRemotePeerId(remoteId);
        setRemotePeerId(remoteId);


        console.log('remotePeerId = ', remotePeerId);
        console.log('remoteId = ', remoteId);
        console.log('store.remotePeerId = ', store.remotePeerId);

        if(peer) {
            console.log("checking remotePeerId again: ", remotePeerId);
            const conn = peer.connect(remotePeerId); // instead of remote id
            setConnection(conn);

            // conn.on('open', () => {
            //     console.log('Connected to remote peer ID: ', remotePeerId); // instead of remoteId
            //     setConnection(conn);
            // });

            conn.on('data', (data) => {
                console.log('sends messages within handleconnect');
                setMessages((prevMessages) => [...prevMessages, { from: store.remotePeerId, text: data }]);
            });
        }
    }


    const handleSendMessage = () => {
        if(connection) {
          console.log('send messages from submission of button');
          connection.send(inputMessage);
          setMessages((prevMessages) => [...prevMessages, { from: store.username || 'local', text: inputMessage }]);
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
            <Typography >
                User ID: {peerId}
            </Typography> 
            <Typography>
                Callee ID: {remotePeerId}
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
            
            <Box sx={{ 
                backgroundColor: '#FAF8F6', 
                width: '100%', 
                
                padding: 8, 
                borderRadius: 2, 
                maxHeight: '300px', // Set a fixed height for the chat container
                overflowY: 'auto', // Add a vertical scrollbar when the content exceeds the container height 
            }}>
            {messages.map((message, index) => {
                const isLocal = message.from === 'local' || store.username;
                return (
                <Grid container key={index} sx={{ marginBottom: 1 }}>
                    <Grid item xs={isLocal ? 0 : 6} />
                    <Grid item xs={6}>
                    <Box
                        sx={{
                            padding: 1,
                            borderRadius: 2.5,
                            backgroundColor: isLocal ? 'lightblue' : 'lightgreen',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal',
                            overflowWrap: 'break-word',
                        }}
                    >
                        {message.from}: {message.text}
                    </Box>
                    </Grid>
                    <Grid item xs={isLocal ? 6 : 0} />
                </Grid>
                );
            })}
            </Box>
            
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Grid container>
                    <Grid item xs={10}>
                    <TextField
                        fullWidth
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message"
                        variant="outlined"
                        size="small"
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <Button variant="contained" onClick={handleSendMessage}>
                        Send
                    </Button>
                    </Grid>
                </Grid>
            </Box>
            
        </Box>
    );

}

export default PeerChat;