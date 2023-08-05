//store reducer (redux)
import { Global } from '@emotion/react';
import { StarRateTwoTone, Store } from '@mui/icons-material';
import { Peer } from "peerjs";

import { React, createContext, useReducer, useContext, useState } from 'react'
export const GlobalStoreContext = createContext({});

export const initialState = {
    isLoggedIn: false,
    incomingCall: false,
    callStatus: false,
    username: "",
    password: "",
    phone: "",
    occupation: "",
    profilePic: null,
    callee: "",
    msg: "",
    peer: null,
    callId: "",  // user's peer id for PeerCall
    chatId: "",  // user's peer id for PeerChat
    remotePeerId: "" //remote user's peer id
}

export const GlobalStoreActionType = {
    SET_IS_LOGGED_IN: "SET_IS_LOGGED_IN",
    SET_INCOMING_CALL: "SET_INCOMING_CALL",
    SET_CALL_STATUS: "SET_CALL_STATUS",
    SET_USERNAME: "SET_USERNAME",
    SET_PASSWORD: "SET_PASSWORD",
    SET_PHONE: "SET_PHONE",
    SET_OCCUPATION: "SET_OCCUPATION",
    SET_PROFILE_PIC: "SET_PROFILE_PIC",
    SET_CALLEE: "SET_CALLEE",
    SET_MSG: "SET_MSG",
    CREATE_PEER: "CREATE_PEER",
    SET_CALL_ID: "SET_CALL_ID",
    SET_CHAT_ID: "SET_CHAT_ID",
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
        case GlobalStoreActionType.SET_INCOMING_CALL: {
            return {
                ...state,
                incomingCall: action.payload.incomingCall
            }
        }
        case GlobalStoreActionType.SET_CALL_STATUS: {
            return {
                ...state,
                callStatus: action.payload.callStatus
            }
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
        case GlobalStoreActionType.SET_OCCUPATION: {
            return {
                ...state,
                occupation: action.payload.occupation
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
        case GlobalStoreActionType.CREATE_PEER: {
            return {
                ...state,
                peer: action.payload.peer
            }
        }
        case GlobalStoreActionType.SET_CALL_ID: {
            return {
                ...state,
                callId: action.payload.callId
            }
        }
        case GlobalStoreActionType.SET_CHAT_ID: {
            return {
                ...state,
                chatId: action.payload.chatId
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

    store.setIncomingCall = () => {
        const opposite = !store.incomingCall;
        dispatch({
            type: GlobalStoreActionType.SET_INCOMING_CALL,
            payload: {opposite}
        });
    }

    store.setCallStatus = () => {
        const opposite = !store.callStatus;
        dispatch({
            type: GlobalStoreActionType.SET_CALL_STATUS,
            payload: {opposite}
        })
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

    store.setOccupation = (occupation) => {
        dispatch({
            type: GlobalStoreActionType.SET_OCCUPATION,
            payload: {occupation}
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

    store.createPeer = () => {
        const newPeer = new Peer(store.username);
        dispatch({
            type: GlobalStoreActionType.CREATE_PEER,
            payload: {newPeer}
        });
    }

    store.setCallId = (callId) => {
        dispatch({
            type: GlobalStoreActionType.SET_CALL_ID,
            payload: {callId}
        });
    }

    store.setChatId = (chatId) => {
        dispatch({
            type: GlobalStoreActionType.SET_CHAT_ID,
            payload: {chatId}
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