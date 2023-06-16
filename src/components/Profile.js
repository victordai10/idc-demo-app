import React, { useState, useContext } from 'react';
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

const Profile = () => {
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();

    const defaultProfileImage = "https://th.bing.com/th/id/R.67827ff3dd64bbbcb160eefa6ab150a9?rik=j%2flB8VmEWIs9Bg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-qDc5kIFIhb8%2fUoJEpGN9DmI%2fAAAAAAABl1s%2fBfP6FcBY1R8%2fs320%2fBlueHead.jpg&ehk=dMHPxs9WRYvMgQqfGxuhupwv%2fwiQMvsXHHD9ReK4kNs%3d&risl=&pid=ImgRaw&r=0";

    const handleBackArrow = (event) => {
        event.preventDefault();
        navigate('/dashboard');
    }

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          store.setProfilePic(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // ? do you want to actually authenticate the form data (username, password)
        // global store reducer to detect being logged in
        store.setUsername(formData.get('username'));
        store.setPassword(formData.get('password'));
        // Navigate to dashboard page
        navigate('/dashboard');
    }
    
    return (
    <Grid container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{display: 'flex', alignItems: 'center', position: 'relative'}}>
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
                        My Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Avatar sx={{ m: 1, bgcolor: 'transparent', width: '100px', height: '100px' }}>
                            <input
                                type="file"
                                id="profileImageInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="profileImageInput">
                            <div className="profileImageContainer">
                                <img
                                src={store.profilePic || defaultProfileImage}
                                alt="Profile"
                                className="profileImage"
                                />
                                <span className="profileImageText">Change Image</span>
                            </div>
                            </label>
                        </Avatar>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username/ATTUID"
                            name="username"
                            autoComplete="current-username"
                            autoFocus
                            onChange={(event) => store.setUsername(event.target.value)}
                            value={store.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => store.setPassword(event.target.value)}
                            value={store.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone"
                            type="phone"
                            id="phone"
                            autoComplete="phone"
                            onChange={(event) => store.setPhone(event.target.value)}
                            value={store.phone}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update My Profile
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}   

export default Profile;