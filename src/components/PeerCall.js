import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
import Peer from 'peerjs';

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';



const PeerCall = () => {
    const { store } = useContext(GlobalStoreContext);

    const [peerId, setPeerId] = useState(store.username);
    const [remotePeerId, setRemotePeerId] = useState('');
    const currentUserVideoRef = useRef(null);
    const remoteVideoRef = useRef(null); 
    const peerInstance = useRef(null);

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState('');
    const [inputMessage, setInputMessage] = useState('');

    

    useEffect(() => {
        const peer = new Peer(store.username);

        peer.on('open', (id) => {
            setPeerId(id);
        });

        // remote peer receives call here
        peer.on('call', (call) => {
            // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            console.log("Remote Peer has received the call");
            // error comes here!!!

            navigator.mediaDevices.getUserMedia({video: false, audio: true})
            .then((mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                
                call.answer(mediaStream); //answer call with A/V Stream
                call.on('stream', function(remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                });
            })
            .catch((err) => {
                console.error(`you got an error: ${err}`);
            });
        })
        
        peer.on('connection', (conn) => {
            // Handle incoming connections
            setConnection(conn);
            // remote peer receives new messages
            conn.on('data', (data) => {
                setMessages((prevMessages) => [...prevMessages, { from: 'remote', text: data }]);
            });
        });

        // establish peerInstance for use outside of useEffect
        peerInstance.current = peer;

        // prevent mem leaks when unmounting
        return () => {
            if(peer) {
                peer.destroy();
            }
        };
    }, []); // end of useEffect (constantly listening for calls)



    //HANDLE/CALLBACK FUNCTIONS


    // us calling the remote peer
    const call = (remotePeerId) => {
        console.log("HI");
        console.log(remotePeerId); // comes out as blank
        
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                const call = peerInstance.current.call(remotePeerId, mediaStream);
                // when call is answered, get remote peer's video
                call.on('stream', (remoteStream) => {
                    console.log('Call is made to the remote peer!!!!!');
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                });     
            })
            .catch((err) => {
            console.error(`you got an error: ${err}`);
        });
    }



    const handleConnect = (event) => {
        
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const remoteId = formData.get("remotePeerId");

        console.log("remoteID: " + remoteId);
        console.log(formData.get("remotePeerId"));

        setRemotePeerId(remoteId);
        store.setRemotePeerId(remoteId);
        
        //doesn't actually get remotePeerId (or not quick enough due to not being in useEffect)

        console.log("Remote Peer Id: ",  remotePeerId);
        if(peerInstance) {
            // const conn = peerInstance.connect(remotePeerId);
            // setConnection(conn);
            // conn.on('data', (data) => {
            //     setMessages((prevMessages) => [...prevMessages, { from: 'remote', text: data }]);
            // });

            // Video Call 
            call(remoteId);
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
        <Box component="form" noValidate onSubmit={handleConnect} sx={{ mt: 1 }}>

            <Typography component="h2" variant="h7">
                Video Camera with options for microphone, camera (settings for video camera using web rtc)
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
                id="remotePeerId"
                label="Enter Remote Peer Id"
                name="remotePeerId"
                autoComplete="remotePeerId"
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
            <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                <video ref={currentUserVideoRef} width="50%" height="50%"/>
                <video ref={remoteVideoRef} width="50%" height="50%"/>
            </Box>
            <div>
                <textarea
                rows="10"
                cols="50"
                value={Array.isArray(messages) ? messages.map((message) => `${message.from}: ${message.text}\n`).join('') : ''}
                readOnly
                />
            </div>
            <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
       
        </Box>
    );



} //end of PeerjsCall

export default PeerCall;