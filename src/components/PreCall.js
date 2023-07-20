import React, { useState, useContext, useEffect, useRef } from 'react';
// import Peer from "peerjs";
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store'

import Avatar from '@mui/material/Avatar';
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

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PreCall = () => {
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();


    const handleBackArrow = (event) => {
        event.preventDefault();
        store.setCallee("");
        navigate('/dashboard');
    }

    const handleAttachedFiles = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            // You can now access the selected files as an array
            const filesArray = Array.from(event.target.files);
            // set them in store a store variable?
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const callee = formData.get("callee");
        const msg = formData.get("callMsg");
        store.setCallee(callee);
        store.setMsg(msg);
        console.log("PreCall-> callee = ", callee);
        console.log("PreCall-> msg = ", msg);

        // triggers call using peerjs and web rtc!
        store.setRemotePeerId(callee);
        navigate("/InCall");
    }
    
    return (
    <Grid container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{display: 'flex', alignItems: 'center', position: 'relative', justifyContent: 'center'}}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <ArrowBackIcon 
                        sx={{
                            position: 'absolute', // Add 'position: absolute'
                            top: '16px', // Add 'top' property
                            left: '16px', // Add 'left' property
                            cursor: 'pointer',
                            transition: 'all 0.3s', // Add transition property here
                            ':hover': {
                                backgroundColor: 'primary.light',
                                transform: 'scale(1.10)',
                                transition: 'all 0.3s',
                            },
                            width: '27px',
                            height: '27px'
                        }}
                        onClick={handleBackArrow}
                    />
                    <Typography component="h1" variant="h5">
                        Pre-Call
                    </Typography>
                    
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Typography component="h4" variant="p1" sx={{alignItems: 'center'}}>
                            Who would you like to set up a call with?
                        </Typography>
                        <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="callee"
                                label="Enter Callee's Username/ATTUID"
                                name="callee"
                                autoComplete="current-callee"
                                autoFocus
                        />   
                        <Typography component="h4" variant="p1">
                            What is the purpose of your call?
                        </Typography>
                        <TextField
                            margin="normal"
                            // required
                            fullWidth
                            name="callMsg"
                            label="Brief message/Purpose of Call..."
                            id="callMsg"
                            autoComplete="current-callMsg"
                            multiline // Add this line to enable multiline text area
                            rows={4} // Add this line to set the number of visible text lines
                        />
                        {/* Label for files/attachments */}
                        <input
                            type="file"
                            id="preCallFiles"
                            accept="*"
                            onChange={handleAttachedFiles}
                            multiple   
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Call
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}   

export default PreCall;