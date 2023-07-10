import '../App.css';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
import Peer from 'peerjs';

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';

const InCall = () => {
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();
    const [peerId, setPeerId] = useState('');
    const [remotePeerId, setRemotePeerId] = useState('');
    const currentUserVideoRef = useRef(null);
    const remoteVideoRef = useRef(null); 
    const peerInstance = useRef(null);

    useEffect(() => {
        const peer = new Peer();

        peer.on('open', (id) => {
            setPeerId(id);
        });

        // remote peer receives call here
        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({video: true, audio: true}, (mediaStream) => {
                call.answer(mediaStream); //answer call with A/V Stream
                call.on('stream', function(remoteStream) {
                    // Show stream in some video/canvas element.
                });
            }, (err) => {
            console.log('Failed to get local stream' ,err);
            });
        //     navigator.mediaDevices
        //     .getUserMedia({ video: true, audio: true })
        //     .then((stream) => {
        //         call.answer(stream);
        
        //     })
        //     .catch((err) => {
        //     console.error(`you got an error: ${err}`);
        // });
        })
        peerInstance.current = peer;
    }, []);

    // us calling the remote peer
    const call = (remotePeerId) => {
        console.log("HI");
        console.log(remotePeerId);
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({video: true, audio: true}, (mediaStream) => {
        //initiating call to remote peer
            // show your own screen
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play(); 
            
            var call = peerInstance.current.call(remotePeerId, mediaStream);
            // when call is answered, get remote peer's video

            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
                console.log(remoteVideoRef.current);
            });
            }, (err) => {
            console.log('Failed to get remote stream' ,err);
            });
            // navigator.mediaDevices
            //     .getUserMedia({ video: true, audio: true })
            //     .then((stream) => {
            //         var call = peerInstance.current.call(remotePeerId, stream);
            //         // when call is answered, get remote peer's video
            //         call.on('stream', (remoteStream) => {
            //             remoteVideoRef.current.srcObject = remoteStream;
            //             remoteVideoRef.current.autoPlay();
            //         });
                    
                    
            //     })
            //     .catch((err) => {
            //     console.error(`you got an error: ${err}`);
            // });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // store.setRemotePeerId(formData.get("remotePeerId"));
        call(formData.get("remotePeerId"));
        //stuff to expect:
        // ... lots of things to trigger: Calling with signaling (peerjs)
        // Sending the profile and brief message and setting up how 
        // that looks to the callee
    }

    return(
        <div>
        {/* <Grid 
            container 
            component="main" 
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
            }} 
        >
            <CssBaseline />
            <Grid 
                item xs={12} sm={8} md={5} 
                component={Paper} 
                elevation={6} 
                square 
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    borderRadius: 2.0,
                    m: '10px',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        
                    }}
                >
                    <Grid>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        <Typography component="h2" variant="h7">
                            Video Camera with options for microphone, camera (settings for video camera using web rtc)
                            Peer Id: {peerId}
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
                        </Button> */}
                         <Typography component="h2" variant="h7">
                            Video Camera with options for microphone, camera (settings for video camera using web rtc)
                        </Typography> 
                        <Typography component="h2" variant="h7">
                            Peer Id: {peerId}
                        </Typography> 
                        <Typography component="h2" variant="h7">
                            Remote PeerId: {remotePeerId}
                        </Typography> 
                        <input type="text" value={remotePeerId} onChange={e => setRemotePeerId(e.target.value)}/>
                        <button onClick={() => call(remotePeerId)}>Call</button>
                        <div>
                        <video ref={remoteVideoRef} />
                        </div>
                        <div>
                        <video ref={currentUserVideoRef}/>
                        </div>

                    {/* </Box>
                    <div>
                        <video ref={remoteVideoRef} autoPlay/>
                    </div>
                    </Grid>
                </Box>
            </Grid>
            <Grid 
                item xs={12} sm={8} md={5} 
                component={Paper} 
                elevation={6} 
                square 
                sx={{
                    borderRadius: 4.0,
                    m: '10px'
                }}
            >
                <Box
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
                    <TextField
                            margin="normal"S
                            fullWidth
                            id="chat"
                            label="Chat..."
                            name="chat"
                            autoComplete="current-chat"
                            autoFocus
                    />   
                </Box>
               
            </Grid>
            
        </Grid> */}
        </div>
    );
}
export default InCall;