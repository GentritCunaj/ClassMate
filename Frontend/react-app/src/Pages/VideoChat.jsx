import React, { useContext, useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShareScreenButton } from '../Partials/ShareScreenButton';
import { VideoPlayer } from '../Partials/VideoPlayer';
import { RoomContext } from '../Context/RoomContext';
import ReportGroup from'./reportModals/Group'; 
import ws from './socket';

export const VideoChat = () => {
    const { id } = useParams();
    const { stream, screenStream, peers, shareScreen, screenSharingId, setRoomId, leaveRoom } = useContext(RoomContext);
    const { user } = useSelector((store) => store.auth);
    const { email: userName, id: userId } = user;

    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const openGroupModal = (chatId) => {
        setCurrentChatId(chatId);  // Set the current resourceId
        setIsGroupModalOpen(true);
    };
    
    const closeGroupModal = () => {
        setIsGroupModalOpen(false);
    };
    useEffect(() => {
        if (stream) {
            ws.emit('join-room', { roomId: id, peerId: userId, userName });
        }
    }, [id, userId, stream, userName]);

    useEffect(() => {
        setRoomId(id || '');
    }, [id, setRoomId]);

    // Determine the correct screen sharing video stream
    const screenSharingVideo = screenSharingId ? (screenSharingId === userId ? screenStream : peers[screenSharingId]?.screenStream) : null;

    const { [screenSharingId]: sharing, ...peersToShow } = peers;

    return (
        <>
            <div className="flex flex-col min-h-screen">
               
                <div className={`flex grow ${screenSharingVideo ? 'flex-row' : ''}`}>
                    {screenSharingVideo && (
                        <div className="w-4/5 pr-4">
                            <VideoPlayer stream={screenSharingVideo} />
                        </div>
                    )}
                    <div style={{ padding: "30px" }} className={`${screenSharingVideo ? 'w-1/5 grid-cols-1' : 'grid gap-4 grid-cols-4'}`}>
                        {screenSharingId !== userId && (
                            <div>
                                <VideoPlayer stream={stream} />
                            </div>
                        )}
                        {Object.values(peersToShow)
                            .filter(peer => !!peer.stream)
                            .map(peer => (
                                <div key={peer.peerId}>
                                    <VideoPlayer stream={peer.stream} />
                                    <div className='userNameVideo'>{peer.userName}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: 'fit-content', position: "relative", left: "5%" }} className="h-28 fixed bottom-0 p-6 w-full flex items-center justify-center border-t-2">
                <ShareScreenButton onClick={shareScreen} />
                <button onClick={leaveRoom}>Leave Room</button>
                <button onClick={() => openGroupModal(id)} >Report Group</button>
            </div>
            <ReportGroup
                isOpen={isGroupModalOpen} 
                onClose={closeGroupModal} 
                groupId={id}  // Pass the resourceId to the modal
            />
            
        </>
    );
};

export default VideoChat;