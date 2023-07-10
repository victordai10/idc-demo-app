//store reducer (redux)
import { Global } from '@emotion/react';
import { StarRateTwoTone, Store } from '@mui/icons-material';
import { Peer } from "peerjs";

import { React, createContext, useReducer, useContext, useState } from 'react'
export const GlobalStoreContext = createContext({});

export const initialState = {
    isLoggedIn: false,
    username: "",
    password: "",
    phone: "",
    profilePic: null,
    callee: "",
    msg: "",
    peer: "",
    call: "",
    peerId: "", // should we make peerId simply be your username? 
    remotePeerId: ""
}

export const GlobalStoreActionType = {
    SET_IS_LOGGED_IN: "SET_IS_LOGGED_IN",
    SET_USERNAME: "SET_USERNAME",
    SET_PASSWORD: "SET_PASSWORD",
    SET_PHONE: "SET_PHONE",
    SET_PROFILE_PIC: "SET_PROFILE_PIC",
    SET_CALLEE: "SET_CALLEE",
    SET_MSG: "SET_MSG",
    SET_CALL: "SET_CALL",
    SET_PEER_ID: "SET_PEER_ID",
    SET_REMOTE_PEER_ID: "SET_REMOTE_PEER_ID"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    
    const globalStoreReducer = (state, action) => {
      switch (action.type) {
        // LIST UPDATE OF ITS NAME
        case GlobalStoreActionType.SET_IS_LOGGED_IN: {
          return {
              ...state,
              isLoggedIn: action.payload.isLoggedIn
          };
        }
        case GlobalStoreActionType.SET_USERNAME: {
            return {
                ...state,
                username: action.payload.username
            }
        }
        case GlobalStoreActionType.SET_PASSWORD: {
            return {
                ...state,
                password: action.payload.password
            }
        }
        case GlobalStoreActionType.SET_PHONE: {
            return {
                ...state,
                phone: action.payload.phone
            }
        }
        case GlobalStoreActionType.SET_PROFILE_PIC: {
            return {
                ...state,
                profilePic: action.payload.profilePic
            }
        }
        case GlobalStoreActionType.SET_CALLEE: {
            return {
                ...state,
                callee: action.payload.callee
            }
        }
        case GlobalStoreActionType.SET_MSG: {
            return {
                ...state,
                msg: action.payload.msg
            }
        }
        case GlobalStoreActionType.SET_PEER_ID: {
            return {
                ...state,
                peerId: action.payload.peerId
            }
        }
        case GlobalStoreActionType.SET_REMOTE_PEER_ID: {
            return {
                ...state,
                remotePeerId: action.payload.remotePeerId
            }
        }
        default:
            return state;
      }
    }

    const [store, dispatch] = useReducer(globalStoreReducer, initialState);

    // Functions to change the global store

    store.setIsLoggedIn = (isLoggedIn) => {
        dispatch({
            type: GlobalStoreActionType.SET_IS_LOGGED_IN,
            payload: {isLoggedIn}
        });
    }

    store.setUsername = (username) => {
        dispatch({
            type: GlobalStoreActionType.SET_USERNAME,
            payload: {username}
        });
    }

    store.setPassword = (password) => {
        dispatch({
            type: GlobalStoreActionType.SET_PASSWORD,
            payload: {password}
        });
    }

    store.setPhone = (phone) => {
        dispatch({
            type: GlobalStoreActionType.SET_PHONE,
            payload: {phone}
        });
       
    }

    store.setProfilePic = (profilePic) => {
        dispatch({
            type: GlobalStoreActionType.SET_PROFILE_PIC,
            payload: {profilePic}
        });
    }

    store.setCallee = (callee) => {
        dispatch({
            type: GlobalStoreActionType.SET_CALLEE,
            payload: {callee}
        });
    }

    store.setMsg = (msg) => {
        dispatch({
            type: GlobalStoreActionType.SET_MSG,
            payload: {msg}
        });
    }

    store.setPeerId = (peerId) => {
        dispatch({
            type: GlobalStoreActionType.SET_PEER_ID,
            payload: {peerId}
        });
    }

    store.setRemotePeerId = (remotePeerId) => {
        dispatch({
            type: GlobalStoreActionType.SET_REMOTE_PEER_ID,
            payload: {remotePeerId}
        });
    }

    // store.call = (remotePeerId) => {
    //     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    //     //
    //     getUserMedia({video: true, audio: true}, (mediaStream) => {
    //     //initiating call to remote peer
    //     const call = peer.call(remotePeerId, mediaStream);
    //     // when call is answered, get remote peer's video
    //     call.on('stream', (remoteStream) => {
    //         remoteVideoRef.current.srcObject = remoteStream;
    //     });
    //     }, (err) => {
    //     console.log('Failed to get remote stream' ,err);
    //     });
    // }

    return (
        <GlobalStoreContext.Provider value={ { store } }>
              {props.children}
        </GlobalStoreContext.Provider>
    );

}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };