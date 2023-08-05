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

const Dashboard = () => {
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();

    const defaultProfileImage = "https://th.bing.com/th/id/R.67827ff3dd64bbbcb160eefa6ab150a9?rik=j%2flB8VmEWIs9Bg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-qDc5kIFIhb8%2fUoJEpGN9DmI%2fAAAAAAABl1s%2fBfP6FcBY1R8%2fs320%2fBlueHead.jpg&ehk=dMHPxs9WRYvMgQqfGxuhupwv%2fwiQMvsXHHD9ReK4kNs%3d&risl=&pid=ImgRaw&r=0";

    const handleProfileClick = (event) => {
        navigate("/Dashboard/Profile");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        store.setCallee(formData.get("callee"));
        navigate("/PreCall");
    }

    const handleLogout = (event) => {
        event.preventDefault();
        navigate("/");
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
                    cursor: 'pointer',
                    transition: 'all 0.3s', // Add transition property here
                    ':hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'scale(1.05)',
                        transition: 'all 0.3s',
                    },
                    // ':active': {
                    //     backgroundColor: 'primary.light',
                    //     transform: 'scale(0.95)',
                    //     transition: 'all 0.1s',
                    //   },
                    borderRadius: 4.0,
                    m: '10px',
                    position: 'relative'
                }}
                onClick={handleProfileClick}
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
                    <EditIcon
                        sx={{
                            position: 'absolute', // Add 'position: absolute'
                            top: '16px', // Add 'top' property
                            right: '16px', // Add 'right' property
                            width: '27px',
                            height: '27px'
                        }}
                    />
                    <Grid>
                        <Typography component="h2" variant="h7">
                            My Profile
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
                                Username: {store.username}
                            </Typography> 

                            <Typography component="h3" variant="p1" class="profileFields">
                                Email: VD5693@att.com
                            </Typography>

                            <Typography component="h3" variant="p1" class="profileFields">
                                Phone: {store.phone}
                            </Typography>

                            <Typography component="h3" variant="p1" class="profileFields">
                                Occupation: {store.occupation}
                            </Typography>

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
                     
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, width: '175px', height: '50px', backgroundColor: '#00a8e0', color: 'black' }}
                        onClick={handleSubmit}
                        component="form" noValidate onSubmit={handleSubmit}
                    >
                        Set Up Call
                    </Button>
                    
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, width: '175px', height: '50px', backgroundColor: 'black', color: 'red' }}
                        onClick={handleLogout}
                        component="form" noValidate onSubmit={handleLogout}
                    >
                        Log Out
                    </Button>
                </Box>
                
            </Grid>
            
        </Grid>
    );
}
export default Dashboard;