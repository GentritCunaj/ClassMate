import React, { useState, useEffect } from "react";
import { createConnection } from "./signalr";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion';
import "../assets/css/chat.css";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import ReportChat from './reportModals/Chat';
import ReportGroup from'./reportModals/Group';  // Correct the import path
import Modal from './Modal'; // Import the Modal component

function Chat() {
  const { groupId } = useParams();
  const { user } = useSelector((store) => store.auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connection, setConnection] = useState(null);
  const [userColors, setUserColors] = useState({});
  const [onlineUsers,setOnlineUsers]= useState([]);


  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [usersId, setCurrentUsersId] = useState(null);
    const openModal = (chatId,usersId) => {
      setCurrentChatId(chatId);
      setCurrentUsersId(usersId);  // Set the current resourceId
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };


  const openGroupModal = (chatId) => {
    setCurrentChatId(chatId);  // Set the current resourceId
    setIsGroupModalOpen(true);
};

const closeGroupModal = () => {
    setIsGroupModalOpen(false);
};

  const navigate = useNavigate();

  const [hoveredMessage, setHoveredMessage] = useState(null);


  useEffect(() => {
    const conn = createConnection(groupId);
    setConnection(conn);

    const joinGroup = async () => {
        await conn.invoke("JoinGroup", groupId,localStorage.getItem("token")).catch(err => console.error(err));
      };

    conn.on("ReceiveMessage", (user1, message, timestamp) => {
      const type = user1.id === user.id ? 'sent' : 'received';
      if (type == 'sent'){
        setMessages(prevMessages => [...prevMessages, { user: user1, message, type, timestamp }]);
      }
      else {
        setMessages(prevMessages => [...prevMessages, { creator: user1, message, type, timestamp }]);
      }
     
    });

   

  
    conn.on("LoadMessages", (loadedMessages) => {
     
      const modifiedMessages = loadedMessages.map(message => {
        const type = message.creator.id === user.id ? 'sent' : 'received';
        return { ...message, type };
      });
      setMessages(modifiedMessages);
    });
    

    conn.on("UpdateOnlineUsers", (onlineUsers) => {
        const newUserColors = { ...userColors };
        onlineUsers.forEach(user => {
          if (!newUserColors[user.id]) {
            newUserColors[user.id] = getUserColor();
          }
        });
        setUserColors(newUserColors);
        setOnlineUsers(onlineUsers);
        console.log("Online users:", onlineUsers);
      });

      conn.start().then(joinGroup).catch(err => console.error(err));

    return () => {
      conn.off("ReceiveMessage");
      conn.off("LoadMessages");
      conn.off("UpdateOnlineUsers");
      conn.stop();
    };
  }, [groupId]);

  useEffect(() => {
    const chatPage = document.querySelector(".chats");
    if (chatPage) {
      setTimeout(() => {
        chatPage.scrollTop = chatPage.scrollHeight;
      }, 250);
    }
  }, [messages]);

  const sendMessage = () => {
    connection.invoke("SendMessage", user.id, input, groupId).catch(err => console.error(err));
    setInput("");
  };

  const leaveGroup = () => {
    
    navigate("/studyGroups");
    connection.invoke("LeaveGroup", groupId).catch((err) => console.error(err));
};

  const generateRandomDarkColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getUserColor = (userId) => {
    if (!userColors[userId]) {
      const newColor = generateRandomDarkColor();
      setUserColors(prevColors => ({ ...prevColors, [userId]: newColor }));
    }
    return userColors[userId];
  };
  const handleReport = (messageId) => {
    // Implement reporting logic here
    
    console.log("Message reported:", hoveredMessage);
    // You can perform reporting action here
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const currentDate = new Date();
    if (date.toDateString() === currentDate.toDateString()) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
    if (date.toDateString() === yesterdayDate.toDateString()) {
      return "Yesterday";
    }
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <Header prop={true} />
      <div style={{ float: "left", width: "20%", marginLeft: "4rem", height: "550px", display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "2rem" }}>
      <div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div className="online-status"></div>
            <h3 style={{ textAlign: "end", margin: "0 0 0 10px" }}>Online Users</h3>
        </div>
        <ul>
            {onlineUsers.map((user) => (
                <li key={user.id} style={{ backgroundColor: userColors[user.id] || "slateblue", padding: "0.7rem", borderRadius: "15px", marginBottom: "10px" }}>
                    <span style={{ fontFamily: "monospace" }}>{user.firstName} {user.lastName} {user.email}</span>
                </li>
            ))}
        </ul>
    </div>
    <div className="button-container" style={{ textAlign: "center" }}>
        <button onClick={leaveGroup} style={{ marginBottom: "1rem" }}>Leave Chat</button>
    </div>
    <div className="button-container" style={{ textAlign: "center" }}>
    <button onClick={() => openGroupModal(groupId)} style={{ marginBottom: "1rem" }}>Report Group</button>
    </div>
      </div>
      <div className="chatcontainer">
        <div className="chat-page">
          <div className="msg-inbox">
            <div className="chats">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div key={index} initial={{ opacity: 0, height: 0 }} transition={{ opacity: 0.15 }} animate={{ opacity: 1, height: "auto" }} className={message.type === "sent" ? "outgoing-chats" : "received-chats"}>
                    <div
                      className={message.type === "sent" ? "outgoing-msg" : "received-msg"}
                      onMouseEnter={() => setHoveredMessage(message)}
                      onMouseLeave={() => setHoveredMessage(null)}
                    >
                      {message.type === "sent" ? (
                        <div className="outgoing-chats-msg">
                          <p className="multi-msg">{message.message}</p>
                          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <span className="time">{formatTimestamp(message.timestamp)}</span>
                            <div style={{ position: "relative", top: "-10px", backgroundColor: "darkslateblue" }} className="avatar1">
                              <h3 style={{ position: "relative", left: "13px", top: "5px" }}> {user && user.firstName.charAt(0)}{user && user.lastName.charAt(0)} </h3>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="received-msg-inbox">
                          <p className="multi-msg">{message.message}</p>
                          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "10px" }}>
                            <div style={{ display: "flex" }}>
                              <div style={{ position: "relative", top: "-10px", backgroundColor: getUserColor(message.creator && message.creator.id) }} className="avatar1">
                                <h3 style={{ position: "relative", left: "13px", top: "5px" }}> {message.creator && message.creator.firstName.charAt(0)}{message.creator && message.creator.lastName.charAt(0)}</h3>
                              </div>
                              <span style={{ left: "10%" }} className="time">{message.creator && message.creator.firstName} {message.creator && message.creator.lastName}</span>
                            </div>
                            <span className="time">{formatTimestamp(message.timestamp)}</span>
                            {hoveredMessage === message && (
                              <div style={{ position: "relative", top: "-10px" }}>
                                <button onClick={() => openModal(message.chatMessageId,message.creatorId)}>Report</button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <ReportChat 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                chatId={currentChatId}
                userSent={usersId}  // Pass the resourceId to the modal
            />
            
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="input-group">
              <input
                type="text"
                id="messageInput"
                className="form-control"
                placeholder="Send message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <span id="sendSpan" onClick={sendMessage} className="input-group-text send-icon">
                <svg style={{ width: '80%', position: 'relative', left: '-20px', height: 'auto' }} fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.009,10.845a1,1,0,0,0,.849.859l8.258,1.18,1.18,8.258a1,1,0,0,0,1.909.252l7.714-18a1,1,0,0,0-1.313-1.313L2.606,9.8A1,1,0,0,0,2.009,10.845Zm11.762,6.483-.711-4.974,4.976-4.976Zm2.85-11.363-4.974,4.974-4.976-.71Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ReportGroup
                isOpen={isGroupModalOpen} 
                onClose={closeGroupModal} 
                groupId={groupId}  // Pass the resourceId to the modal
            />
    </>
  );
}

export default Chat;