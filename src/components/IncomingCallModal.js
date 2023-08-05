
import React , { useEffect, useRef, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GlobalStoreContext } from '../store';


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

const IncomingCallModal = () => {
    const { store } = useContext(GlobalStoreContext);
    const defaultProfileImage = "https://th.bing.com/th/id/R.67827ff3dd64bbbcb160eefa6ab150a9?rik=j%2flB8VmEWIs9Bg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-qDc5kIFIhb8%2fUoJEpGN9DmI%2fAAAAAAABl1s%2fBfP6FcBY1R8%2fs320%2fBlueHead.jpg&ehk=dMHPxs9WRYvMgQqfGxuhupwv%2fwiQMvsXHHD9ReK4kNs%3d&risl=&pid=ImgRaw&r=0";


    const handleAccept = () => {

    }

    const handleDecline = () => {

    }

    return (
        <Grid container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CssBaseline />
            <Grid 
                item xs={12} sm={8} md={5} 
                component={Paper} 
                elevation={6} 
                square 
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                   
                    borderRadius: 4.0,
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
                           Incoming Call
                        </Typography> 
                        <div>
                        <Avatar sx={{ m: 1, bgcolor: 'transparent', width: '100px', height: '100px', alignItems: 'center' }}>
                            <img
                                src={store.profilePic || defaultProfileImage}
                                alt="Profile Image"
                                style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </Avatar>
                            <Typography component="h3" variant="p1" class="profileFields">
                                Username: Victor Dai
                            </Typography> 

                            <Typography component="h3" variant="p1" class="profileFields">
                                Email: VD5693@att.com
                            </Typography>

                            <Typography component="h3" variant="p1" class="profileFields">
                                Phone: 123-456-789
                            </Typography>

                            <Typography component="h3" variant="p1" class="profileFields">
                                Occupation: TDP Intern
                            </Typography>

                            <Typography component="h3" variant="p1" class="profileFields">
                                Call Description: Meeting with John Stankey to discuss progress with the IMS DC Application
                            </Typography>

                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    
                                }}
                            > 
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: '175px', height: '50px', backgroundColor: '#00ff00', color: 'black' }}
                                    onClick={handleAccept}
                                    component="form" noValidate onSubmit={handleAccept}
                                >
                                    Accept
                                </Button>
                                
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: '175px', height: '50px', backgroundColor: 'red', color: 'black',}}
                                    onClick={handleDecline}
                                    component="form" noValidate onSubmit={handleDecline}
                                >
                                    Decline
                                </Button>
                            </Box>
                        </div>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default IncomingCallModal;