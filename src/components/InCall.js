import '../App.css';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
import PeerjsCall from './PeerCall';

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


const InCall = () => {
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // store.setRemotePeerId(formData.get("remotePeerId"));
        // setRemotePeerId(formData.get("remotePeerId"));
        // console.log("Remote Peer Id: ",  remotePeerId);
        // call(remotePeerId);
        //stuff to expect:
        // ... lots of things to trigger: Calling with signaling (peerjs)
        // Sending the profile and brief message and setting up how 
        // that looks to the callee
    }

    return(
       
        <div>
        <Grid 
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
                    {/* PeerjsCall */}
                    <PeerjsCall />
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
                    <Grid>
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
                    </Grid>
                </Box>
               
            </Grid>
            
        </Grid>
        </div>
    );
}
export default InCall;