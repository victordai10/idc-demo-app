import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from "./components/LoginScreen";
import Dashboard from './components/Dashboard';
import Profile from './components/Profile'

import { GlobalStoreContextProvider } from './store'
import { Global } from '@emotion/react';

function App() {
  

  return (
    <div class='page'>
        <GlobalStoreContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginScreen/>}/>
              <Route path="/Dashboard" element={<Dashboard/>}/>
              <Route path="/Dashboard/Profile" element={<Profile/>}/>
            </Routes>
          </Router>
        </GlobalStoreContextProvider>
      
      {/* <LoginScreen/> */}

    </div>
  );
}

export default App;
