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
    const [remotePeerId, setRemotePeerId] = useState(store.remotePeerId);
    const currentUserVideoRef = useRef(null);
    const remoteVideoRef = useRef(null); 
    const peerInstance = useRef(null);

    const [isCameraOn, setIsCameraOn] = useState(true);
    // const peer = store.peer;

    const defaultProfileImage = "https://th.bing.com/th/id/R.67827ff3dd64bbbcb160eefa6ab150a9?rik=j%2flB8VmEWIs9Bg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-qDc5kIFIhb8%2fUoJEpGN9DmI%2fAAAAAAABl1s%2fBfP6FcBY1R8%2fs320%2fBlueHead.jpg&ehk=dMHPxs9WRYvMgQqfGxuhupwv%2fwiQMvsXHHD9ReK4kNs%3d&risl=&pid=ImgRaw&r=0";

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

            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();

                console.log("Remote Peer ACTUALLY RECEIVED CALL!");

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
        
       
        // establish peerInstance for use outside of useEffect
        peerInstance.current = peer;

        // call(store.remotePeerId);


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
            
            // Video Call 
            call(remoteId);
        }
          
    }


    function toggleCamera() {
        if(currentUserVideoRef.current && currentUserVideoRef.current.srcObject) {
            const stream = currentUserVideoRef.current.srcObject;
            const videoTracks = stream.getVideoTracks();

            if(isCameraOn) {
                // Remove the video track if camera is on
                if(videoTracks.length > 0) {
                    videoTracks[0].stop();
                    stream.removeTrack(videoTracks[0]);
                    //<FontAwesomeIcon icon="fa-light fa-camera-slash" />
                }
            } else {
                // Add the video track if the camera is off
                //<FontAwesomeIcon icon="fa-light fa-camera" />
                navigator.mediaDevices.
                getUserMedia({video: true})
                .then((newStream) => {
                    const newVideoTrack = newstream.getVideoTracks()[0];
                    stream.addTrack(newVideoTrack);
                })
                .catch((err) => {
                    console.log("You got an error:", err.name, err.message);
                });
            }

            setIsCameraOn(!isCameraOn);
        }
      
        // Uncomment these lines if you want to display an image instead of a solid color
        const image = new Image();
        image.src = store.profilePic || defaultProfileImage;
        // image.onload = () => {
        //   context.drawImage(image, 0, 0, width, height);
        // };
    }

    return (
        <Box component="form" noValidate onSubmit={handleConnect} sx={{ mt: 1 }}>

            <Typography component="h2" variant="h7">
                Video Call
            </Typography> 
            <Typography component="h2" variant="h7">
                Peer ID: {peerId}
            </Typography> 
            <Typography component="h2" variant="h7">
                Remote Peer ID: {remotePeerId}
            </Typography> 
            <TextField
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
                <video ref={remoteVideoRef} autoPlay playsInline width="100%" height="100%"/>
                <video ref={currentUserVideoRef} autoPlay playsInline width="100%" height="100%"/>

            </Box>
           
       
        </Box>
    );



} //end of PeerjsCall

export default PeerCall;