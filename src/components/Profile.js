import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store'

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
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{display: 'flex', alignItems: 'center'}}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        My Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
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
                            label="password"
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
                            label="phone"
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