import React, { createContext, useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import ws from "../Pages/socket";
import { peersReducer } from "../reducers/peerReducer";
import {
    addPeerStreamAction,
    addPeerNameAction,
    removePeerStreamAction,
    addAllPeersAction,
} from "../reducers/peerActions";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

// Context Declaration
const RoomContext = createContext({
    peers: {},
    shareScreen: () => {},
    setRoomId: (id) => {},
    screenSharingId: "",
    roomId: "",
    leaveRoom: () => {}, // Add leaveRoom to context
});

// RoomProvider Component
const RoomProvider = ({ children }) => {
    // State and Hooks Initialization
    const { user } = useSelector((store) => store.auth);
    const { email: userName, id: userId } = user;
    const [me, setMe] = useState(null);
    const [stream, setStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null);
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [screenSharingId, setScreenSharingId] = useState("");
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate(); // Add navigate hook

    // Helper Functions
    const getUsers = ({ participants }) => {
        dispatch(addAllPeersAction(participants));
    };

    const removePeer = (peerId) => {
        dispatch(removePeerStreamAction(peerId));
    };

    const switchStream = (stream) => {
        setTimeout(() => {
            if (me) {
                setScreenSharingId(me.id || "");
            }
        }, 2000); // Adjust the timeout duration as needed
    
        Object.values(me?.connections).forEach((connection) => {
            const videoTrack = stream?.getTracks().find((track) => track.kind === "video");
            connection[0].peerConnection
                .getSenders()
                .find((sender) => sender.track.kind === "video")
                .replaceTrack(videoTrack)
                .catch((err) => console.error(err));
        });
    };
    

    const shareScreen = () => {
        if (screenSharingId) {
            setTimeout(() => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(switchStream);
            }, 500); // Adjust the delay as necessary
        } else {
            setTimeout(() => {
                navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
                    switchStream(stream);
                    setScreenStream(stream);
                });
            }, 500); // Adjust the delay as necessary
        }
    };


// Function to initialize PeerJS and WebSocket
const initializePeerJS = (mediaStream, initialId) => {
    let peerId = initialId;

    const createPeer = (id) => {
        const peer = new Peer(id, {
            host: "localhost",
            port: 9001,
            path: "/myapp",
            config: {
                iceServers: [
                    { url: 'stun:stun01.sipphone.com' },
                    // Other ICE servers...
                ]
            }
        });

        peer.on('open', () => {
            console.log('PeerJS connection established with ID:', id);
            setMe(peer);
        });

       
        peer.on("call", (call) => {
            const { userName } = call.metadata;
            dispatch(addPeerNameAction(call.peer, userName));

            call.answer(mediaStream);
            call.on("stream", (peerStream) => {
                dispatch(addPeerStreamAction(call.peer, peerStream));
            });
        });

        return peer;
    };

    return createPeer(peerId);
};

// Effect to initialize media and PeerJS
useEffect(() => {
    const initialize = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            initializePeerJS(mediaStream, userId);
        } catch (error) {
            console.error('Error accessing user media:', error);
        }
    };

    initialize();

    // WebSocket listeners setup and cleanup
    ws.on("get-users", getUsers);
    ws.on("user-disconnected", removePeer);
    ws.on("user-started-sharing", (peerId) => setScreenSharingId(peerId));
    ws.on("user-stopped-sharing", () => setScreenSharingId(""));

    return () => {
        ws.off("get-users", getUsers);
        ws.off("user-disconnected", removePeer);
        ws.off("user-started-sharing", (peerId) => setScreenSharingId(peerId));
        ws.off("user-stopped-sharing", () => setScreenSharingId(""));
        me?.disconnect();
    };
}, [userId]);

useEffect(() => {
    // Emit screen sharing events to WebSocket
    if (screenSharingId) {
        ws.emit("start-sharing", { peerId: screenSharingId, roomId });
    } else {
        ws.emit("stop-sharing");
    }
}, [screenSharingId, roomId]);

useEffect(() => {
    // PeerJS call handling
    if (!me || !stream) return;

    // Listener for 'user-joined' event
    ws.on("user-joined", ({ peerId, userName }) => {
        const call = me.call(peerId, stream, {
            metadata: {
                userName,
            },
        });

        if (call) {
            call.on("stream", (peerStream) => {
                dispatch(addPeerStreamAction(peerId, peerStream));
            });

            dispatch(addPeerNameAction(peerId, userName));
        }
    });

    // Cleanup by removing the 'user-joined' listener
    return () => {
        ws.off("user-joined");
    };
}, [me, stream]);

// Function to handle leaving the room
const leaveRoom = () => {
    ws.emit("leave-room", { roomId, peerId: me.id });
    me.disconnect();
    setRoomId("");
    setScreenStream(null);
    setStream(null);
    dispatch({ type: 'RESET_PEERS' }); // Add a reset action in your reducer
    navigate("/studyGroups"); // Navigate to the home or another page
};

// Return Statement
    return (
        <RoomContext.Provider
            value={{
                stream,
                screenStream,
                peers,
                shareScreen,
                roomId,
                setRoomId,
                screenSharingId,
                leaveRoom, // Pass leaveRoom to context
            }}
        >
            {children}
          
        </RoomContext.Provider>
    );
}
export { RoomContext, RoomProvider };