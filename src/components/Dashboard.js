import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
// import Profile from './Profile';

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


const Dashboard = () => {
    const { store } = useContext(GlobalStoreContext);
    const navigate = useNavigate();
    const handleProfileClick = (event) => {
        console.log(store.username + store.password)
        navigate("/Dashboard/Profile");
    }
    return(
        <Grid container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleProfileClick}>
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
                   <Typography component="h1" variant="h7">
                        My Profile
                    </Typography> 
                    <Grid>
                        <Typography component="h3" variant="p1">
                            Username: {store.username}
                        </Typography> 
                        <Typography component="h3" variant="p1">
                            Password: {store.password}
                        </Typography>
                        <Typography component="h3" variant="p1">
                            Phone: {store.phone}
                        </Typography>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}
export default Dashboard;