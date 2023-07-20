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
#### Using PeerJS
* [PeerJS](https://peerjs.com/docs/#start) is a library that simplifies the process of utilizing Web RTC and signaling to handle making calls and data connections
#### PeerJS Details
* Peer Objects: <br/> The way that PeerJS allows you to make connections and calls over a server is by using Peer objects to represent user endpoints
* Peer ID: <br/> Peer Objects will be able to make calls and Peer-Peer connections by using Peer IDs. Peer IDs are generated upon creation of a Peer Object.
    ####  
        // peer is created with a randomly generated id
        const peer = new Peer();
        
        // peer2 is created with an id of "12345"  
        const peer2 = new Peer("12345")

##### Note: PeerJS hosts their own free server (0.peerjs.com) which is used by default and is what this project uses. They also have documentation to show how to build your own customized server with ExpressPeerServer

* Peer Calling
    * [Navigator.mediaDevices.getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) is a method to get permission to use the camera and audio from browsers and devices and start streams for the current user

    ####
        navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((mediaStream) => {
                    // mediaStream is the user's stream   
                })
                .catch((err) => {
                console.error(`you got an error: ${err}`);
            });

    * peer.call is 