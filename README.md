# idc-demo-app

#### The idc-demo-app was built to act as a proof of concept for an important system to telecomm companies: IP Multimedia Subsystem Data Channel

### IMS DC
#### The [IP Multimedia Subsystem](https://en.wikipedia.org/wiki/IP_Multimedia_Subsystem) Data Channel, IMS DC, is an architectural framework for sending and receiving IP Multimedia Services. Essentially, IMS was developed as a result of an evolving internet and mobile network.Telecomm companies like AT&T and Nokia are utilizing IMS DC to improve content-sharing services in video calls and other communication methods. [Nokia has already implemented voice services using IMS DC ](https://www.nokia.com/networks/core-networks/voice-over-5g-vo5g-core/?did=d00000000608&gad=1&gclid=CjwKCAjwtuOlBhBREiwA7agf1ua9vjPst5A9j5dytJGJd8K0H2MAnHCWpYoFofSxFZSfRhNJYXcs6RoCpwMQAvD_BwE) 
#### This project will demonstrate a basic real-time video calling and chat app using WebRTC API

## User Stories
* User can login and logout
* User can edit their profile
* User can set up a video call with another user
* User can connect and chat with another user
* User can send files to the connected user

## Documentation
#### Technologies: 
* React
* JavaScript
* [Ionic Capacitor](https://capacitorjs.com/) 

* [Peerjs Library](https://peerjs.com/)

#### Using Ionic Capacitor
* Ionic Capacitor is a framework that makes it easy for Web Applications to be turned into Mobile Native Applications
* This project uses the [VS Code Extension of Ionic Capacitor](https://capacitorjs.com/docs/getting-started/vscode-extension#:~:text=Using%20the%20Ionic%2FCapacitor%20VS,on%20the%20Visual%20Studio%20Marketplace.) to convert React code to a working android application
* The steps to convert a web application to an android application using the Ionic Capacitor VS Code Extension: 
1. Build
2. Sync
3. Run 


#### Using PeerJS
* [PeerJS](https://peerjs.com/docs/#start) is a library that simplifies the process of utilizing Web RTC and signaling to handle making calls and data connections
#### PeerJS Details
* Peer Objects: <br/> The way that PeerJS allows you to make connections and calls over a server is by using Peer objects to represent user endpoints
* Peer ID: <br/> Peer Objects will be able to make calls and Peer-Peer connections by using Peer IDs. Peer IDs are generated upon creation of a Peer Object.
    ####
    ```javascript 
        // peer is created with a randomly generated id
        const peer = new Peer();
        
        // peer2 is created with an id of "12345"  
        const peer2 = new Peer("12345") ```

##### Note: PeerJS hosts their own free server (0.peerjs.com) which is used by default and is what this project uses. They also have documentation to show how to build your own customized server with ExpressPeerServer

* Peer Calling
    * [Navigator.mediaDevices.getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) is a method to get permission to use the camera and audio from browsers and devices and start streams for the current user

    ####
    ```javascript
        navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((mediaStream) => {
                    // mediaStream is the user's stream   
                })
                .catch((err) => {
                console.error(`you got an error: ${err}`);
            });
    ```
    ####

    * peer.call is a function that allows the peer to connect with a remote peer using the remote peer's ID. In the process of calling the remote peer, the current peer sends their own MediaStream to the remote peer so that the video stream with audio can be accessed by the remote peer

    * Listening for the call and connections: The method I used in my project to have remote peers listen to incoming calls and data connections from other peers is by having peer call and data connection listening functions within a "useEffect". A useEffect is a React hook that allows for continuous re-rendering of the functions within the useEffect.

    ####
    ```javascript
    useEffect(() => {
        const peer = new Peer(peerId); 
        // checking to see if a peer has been initialized and open to connections
        peer.on('open', (id) => {
            console.log('PeerCall: Call ID: ', peer.id);
            setPeerId(id);
        });

        // remote peer receives call here
        peer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({video: true,audio: true})
            .then((mediaStream) => {
                //set current user's video to the mediaStream
                currentUserVideoRef.current.srcObject = mediaStream;
                // play current user's video stream 
                currentUserVideoRef.current.play();
                //remote peer answers the user's call
                call.answer(mediaStream); 
                // remote peer sends their video stream to play
                call.on('stream', function(remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play();
                });
                    
                    
            }) // debugging
            .catch((err) => {
                console.error(`you got an error: ${err}`);
            });
        })
            
        
        // establish peerInstance for use outside of useEffect
        peerInstance.current = peer;

        call(store.remotePeerId); // once pre-call is submitted -> AUTOMATICALLY TRIGGERS CALL


        // prevent mem leaks when unmounting
        return () => {
            if(peer) {
                peer.destroy();
            }
        };
    }, []); // end of useEffect (constantly listening for calls)
    ```
    
* Peer Data Connections
    * Peer-to-Peer Data Connections happen when both peers connect using the peer.connect(remotePeerID) function
    * In order to set up the peer objects for peer data connections, the peer objects need to be initialized like in PeerCall.js and need to be able to also listen for incoming messages
    
    ####
    ```javascript
    useEffect(() => {
        const initializePeer = async () => {
            const peerInstance = new Peer(peerId); //store.chatId

            peerInstance.on('open', () => {
                console.log('Connected with Chat ID: ', peerInstance.id);
                setPeerId(peerInstance.id);
            });

            peerInstance.on('connection', (conn) => {
                // Handle incoming connections
                console.log('UseEffect: setMessages in peerchat');
                conn.on('data', (data) => {
                    setMessages((prevMessages) => [...prevMessages, {from: store.remotePeerId || 'remote', text: data}]);
                });
            });

            setPeer(peerInstance);
        };

        initializePeer();

        
        
        // prevent mem leaks when unmounting
        return () => {
            if(peer) {
                peer.destroy();
            }
        };
    }, []); // end of useEffect (constantly listening for calls)
    ```
    ####
    * The code example above shows how the peer is instantiated in PeerChat.js and shows how the peerInstance or peer object is able to continuously listen for incoming messages as data 'connections' and have those connections listen for 'data'

    ####
    ```javascript
    const handleSendMessage = () => {
        if(connection) {
          console.log('send messages from submission of button');
          connection.send(inputMessage);
          setMessages((prevMessages) => [...prevMessages, { from: store.username || 'local', text: inputMessage }]);
          setInputMessage('');
          // messages/setMessages is a state variable (useState hook)
        }
    };
    ```
    ####
    * handleSendMessage shows how a peer can send a message through the data connection with connection.send(String)


### Running the Project

#### 1. Dependencies

* When cloning this project, make sure to install all the listed dependencies within the package.json file by using the command ```npm install``` at the root of your directory

* The most important dependencies that this project requires for the web aspect are mui, React, and peerjs dependencies

#### 2. Start App

* Enter ```npm start``` in the terminal at the root of your directory to run the web application on localhost:3000

1. Login Screen
    * The Login Screen is built for demo and UI purposes and does not actually keep track of accounts
      ![Screenshot_20230731-172900_idc-demo-app (1)](https://github.com/victordai10/idc-demo-app/assets/69231171/6e9aaf56-3b5b-4ca1-b1e4-5d8ee632b429)

2. Dashboard/Profile
    * The Dashboard allows users to customize their profiles and set up calls
###### Dashboard
![Screenshot_20230731-173115_idc-demo-app (1)](https://github.com/victordai10/idc-demo-app/assets/69231171/7fb01d34-8c60-4a94-b693-9c5f73d65384)
###### Profile
![Screenshot_20230731-173051_idc-demo-app (1)](https://github.com/victordai10/idc-demo-app/assets/69231171/106fdaa7-0439-4ba4-8373-e4597a3b1a6e)

3. Pre-Call
    * The Pre-Call screen prepares calls by setting up the callee's ID and a brief message that will be sent along with the user's profile to the callee
      ![Screenshot_20230731-173246_idc-demo-app (1)](https://github.com/victordai10/idc-demo-app/assets/69231171/73c38c65-1391-41db-b1c2-7ab4cdfa9ad9)

4. In-Call
    * The In-Call screen is what users will interact with during the call. They will be able to video call, chat, share files, and eventually more when the app is fully implemented
    * Features that can be implemented in the future include: Contacts List for Pre-Calling, Fully functional Video Calls with muting, camera toggling, and screen-sharing, app-sharing, and subscription-based profile enhancements

#### 3. In-Call Features and Current Issues

#### Video Calling (In-Progress)
* Video Calling has not been tested to work between 2 devices. Based on the Developer Tools console, if there were multiple cameras on a computer, we would be able to tell if the app would actually support video calling
* As of right now, if you run the web app on two different browsers through localhost:3000, only the user's camera will show on one browser since there is only one camera on the computer I used
* A run-time error can come up when you enter the In-Call page with the following message: ```The play() request was interrupted by a new load request.``` This most likely comes from a mediaStream issue from refreshing the entire page. In the future, this error would need to be resolved by making the In-Call page foolproof from refreshing or leaving the call

#### Chatting (Almost complete)
* The chatting feature works as intended with a few issues that need to be fixed so that it would be able to work with two devices
    #### Immediate Data Connection
    * Right now, when users enter the In-Call page, data connections are not established immediately and require the user to manually connect to the remote user using the remote user's Peer ID. Eventually, this needs to happen instantaneously once the remote user's accepts the current user's call
    * To resolve this issue, we need to look into problems relating to useEffect and how to establish p2p connections without getting uncaught run-time errors 
    #### How to run the chat currently
    1. Once you reach the In-Call page, <i> refresh both browser's running localhost:3000 </i> and new Peer IDs should show for both browsers in the Chat box

    2. <i>Enter each user's remote peer ID into the TextField and click the Connect button</i>. So basically take the other browser's Peer ID and enter that into the current browser's text field
    3. <i> Make sure the connection works on both sides by entering messages and sending them. If it works correctly, you should see both the user's message from "local" and the same message on the remote peer's browser from "remote" </i>
    
![ChatDemo](https://github.com/victordai10/idc-demo-app/assets/69231171/cd9adfd8-5cb9-4c91-a63f-581fe3cac7d0)


#### Incoming Call Handling

* The Incoming Call Message that the remote user should receive if a current user calls is not functional 
* The largest issue with this is how to approach setting up the data connection in the Pre-Call page that is separate from most of the connections in the In-Call page. 
* The goal will be to have a modal of the Incoming Call Message show up with both the current user's profile page and the brief message stating the purpose of the call that the current user entered in their Pre-Call setup. The IncomingCallModal.js file is the UI for the modal 

#### UI From IncomingCallModal.js

![Screenshot 2023-08-01 170901](https://github.com/victordai10/idc-demo-app/assets/69231171/2f852317-72e1-4f8d-aabc-6f18140714fe)
