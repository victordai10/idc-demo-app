import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from '../store';
import Peer from 'peerjs';

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';

const PeerChat = () => {
    const { store } = useContext(GlobalStoreContext);

    const [peerId, setPeerId] = useState(store.username);
    const [remotePeerId, setRemotePeerId] = useState('');
    
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState('');
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const peer = new Peer(store.username);

        peer.on('open', (id) => {
            setPeerId(id);
        });


        peer.on('connection', (conn) => {
            // Handle incoming connections
            setConnection(conn);
            // remote peer receives new messages
            conn.on('data', (data) => {
                setMessages((prevMessages) => [...prevMessages, { from: 'remote', text: data }]);
            });
        });

        // establish peerInstance for use outside of useEffect
        peerInstance.current = peer;

        // prevent mem leaks when unmounting
        return () => {
            if(peer) {
                peer.destroy();
            }
        };
    }, []); // end of useEffect (constantly listening for calls)


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
            const conn = peerInstance.connect(remotePeerId);
            setConnection(conn);
            conn.on('data', (data) => {
                setMessages((prevMessages) => [...prevMessages, { from: 'remote', text: data }]);
            });

        
        }
          
    }

    const handleSendMessage = () => {
        if(connection) {
          connection.send(inputMessage);
          setMessages((prevMessages) => [...prevMessages, { from: 'local', text: inputMessage }]);
          setInputMessage('');
        }
    };



}

export default PeerChat;