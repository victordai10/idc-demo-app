import '../App.css';

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
// import Profile from './Profile';

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

    const defaultProfileImage = "https://th.bing.com/th/id/R.67827ff3dd64bbbcb160eefa6ab150a9?rik=j%2flB8VmEWIs9Bg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-qDc5kIFIhb8%2fUoJEpGN9DmI%2fAAAAAAABl1s%2fBfP6FcBY1R8%2fs320%2fBlueHead.jpg&ehk=dMHPxs9WRYvMgQqfGxuhupwv%2fwiQMvsXHHD9ReK4kNs%3d&risl=&pid=ImgRaw&r=0";

    const handleProfileClick = (event) => {
        navigate("/Dashboard/Profile");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        //stuff to expect:
        // ... lots of things to trigger: Calling with signaling (peerjs)
        // Sending the profile and brief message and setting up how 
        // that looks to the callee
    }

    return(
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
                        <Typography component="h2" variant="h7">
                            Video Camera with options for microphone, camera (settings for video camera using web rtc)
                        </Typography> 
                        <div>

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
            
        </Grid>
    );
}
export default InCall;