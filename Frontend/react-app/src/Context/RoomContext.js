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
    SET_SCREEN_SHARING_ID
} from "../reducers/peerActions";
import { useSelector } from "react-redux";

const RoomContext = createContext({
    peers: {},
    shareScreen: () => {},
    setRoomId: (id) => {},
    screenSharingId: "",
    roomId: "",
    leaveRoom: () => {}, 
});

const RoomProvider = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const { email: userName, id: userId } = user;
    const [me, setMe] = useState(null);
    const [stream, setStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null);
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [screenSharingId, setScreenSharingId] = useState("");
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();

    const getUsers = ({ participants }) => {
        dispatch(addAllPeersAction(participants));
    };

    const removePeer = (peerId) => {
        dispatch(removePeerStreamAction(peerId));
    };

    const switchStream = (newStream) => {
        Object.values(me?.connections).forEach((connection) => {
            const videoTrack = newStream?.getTracks().find((track) => track.kind === "video");
            connection[0].peerConnection
                .getSenders()
                .find((sender) => sender.track.kind === "video")
                .replaceTrack(videoTrack)
                .catch((err) => console.error(err));
        });
    };

    const shareScreen = () => {
        if (screenSharingId) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((newStream) => {
                switchStream(newStream);
                setScreenStream(null);
                setScreenSharingId("");
            });
        } else {
            navigator.mediaDevices.getDisplayMedia({}).then((newStream) => {
                switchStream(newStream);
                setScreenStream(newStream);
                setScreenSharingId(userId);
            });
        }
    };

    const initializePeerJS = (mediaStream, initialId) => {
        const peer = new Peer(initialId, {
            host: "localhost",
            port: 9001,
            path: "/myapp",
            config: {
                iceServers: [
                    { url: 'stun:stun01.sipphone.com' },
                ]
            }
        });

        peer.on('open', () => {
            console.log('PeerJS connection established with ID:', initialId);
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

        ws.on("get-users", getUsers);
        ws.on("user-disconnected", removePeer);
        ws.on("user-started-sharing", (peerId) => {
            setScreenSharingId(peerId);
            ws.emit("user-started-sharing", { peerId, roomId });
        });
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
        if (screenSharingId) {
            ws.emit("start-sharing", { peerId: screenSharingId, roomId });
        } else {
            ws.emit("stop-sharing");
        }
    }, [screenSharingId, roomId]);

    useEffect(() => {
        if (!me || !stream) return;

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

        return () => {
            ws.off("user-joined");
        };
    }, [me, stream]);

    const leaveRoom = () => {
        ws.emit("leave-room", { roomId, peerId: me.id });
        me.disconnect();
        setRoomId("");
        setScreenStream(null);
        setStream(null);
        dispatch({ type: 'RESET_PEERS' });
        navigate("/studyGroups");
    };

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
                leaveRoom,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

export { RoomContext, RoomProvider };