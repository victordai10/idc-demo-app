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
    const navigate = useNavigate();

    const [peerId, setPeerId] = useState(store.callId);
    const rpid = store.remotePeerId + "-call";
    const [remotePeerId, setRemotePeerId] = useState(rpid);
    const currentUserVideoRef = useRef(null);
    const remoteVideoRef = useRef(null); 
    const peerInstance = useRef(null);

    // const peer = store.peer;

    const defaultProfileImage = "https://th.bing.com/th/id/R.67827ff3dd64bbbcb160eefa6ab150a9?rik=j%2flB8VmEWIs9Bg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-qDc5kIFIhb8%2fUoJEpGN9DmI%2fAAAAAAABl1s%2fBfP6FcBY1R8%2fs320%2fBlueHead.jpg&ehk=dMHPxs9WRYvMgQqfGxuhupwv%2fwiQMvsXHHD9ReK4kNs%3d&risl=&pid=ImgRaw&r=0";

    useEffect(() => {
        const peer = new Peer(peerId); //store.username + '-call' aka store.callId

        peer.on('open', (id) => {
            console.log('PeerCall: Call ID: ', peer.id);
            setPeerId(id);
        });

        // remote peer receives call here
        peer.on('call', (call) => {

            console.log("Remote Peer has received the call");
            // error comes here!!!

            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();

                console.log("Remote Peer ACTUALLY RECEIVED CALL!");
                
                // see if condition works
                if(!store.incomingCall && store.callStatus) {
                    call.answer(mediaStream); //answer call with A/V Stream
                    call.on('stream', function(remoteStream) {
                        remoteVideoRef.current.srcObject = remoteStream;
                        remoteVideoRef.current.play();
                    });
                }
                
            })
            .catch((err) => {
                console.error(`you got an error: ${err}`);
            });
        })
        
       
        // establish peerInstance for use outside of useEffect
        peerInstance.current = peer;

        call(store.remotePeerId); // once pre-call is submitted -> AUTOMATICALLY TRIGGERS CALL


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
            console.error(`Failed to get remoteStream. you got an error: ${err}`);
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

        console.log("Remote Peer Call Id: ",  remotePeerId);
        if(peerInstance) {
            
            // Video Call 
            call(remoteId);
        }
          
    }


    return (
        <Box 
        component="form" noValidate onSubmit={handleConnect} 
        sx={{ 
            mt: 1, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',        
        }} 
        >

            <Typography component="h2" variant="h7">
                Video Call
            </Typography> 
            <Typography >
                pid: {peerId}
            </Typography> 
            <Typography >
                rpid: {remotePeerId}
            </Typography> 
            {/* <TextField
                margin="normal"
                fullWidth
                id="remotePeerId"
                label="Enter Remote Peer ID"
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
            <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'black'
                    }}
                >
                <video ref={remoteVideoRef} autoPlay playsInline width="100%" height="100%"/>
                {/* style the video */}
                <video ref={currentUserVideoRef} autoPlay playsInline width="100%" height="100%"/>

            </Box>
           
       
        </Box>
    );



} //end of PeerjsCall

export default PeerCall;