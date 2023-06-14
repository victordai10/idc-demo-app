//store reducer (redux)
import { Global } from '@emotion/react';
import { React, createContext, useReducer, useContext, useState } from 'react'
export const GlobalStoreContext = createContext({});

export const initialState = {
    isLoggedIn: false,
    username: "",
    password: "",
    phone: ""
}

export const GlobalStoreActionType = {
    SET_IS_LOGGED_IN: "SET_IS_LOGGED_IN",
    SET_USERNAME: "SET_USERNAME",
    SET_PASSWORD: "SET_PASSWORD",
    SET_PHONE: "SET_PHONE"
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

    return (
        <GlobalStoreContext.Provider value={ { store } }>
              {props.children}
        </GlobalStoreContext.Provider>
    );

}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };