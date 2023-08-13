import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "../../Services/axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import styles from "./MessagesPage.module.css";

export default function IndividMessages({ userId }) {
  const location = useLocation();
  const pair = location.state.pair;
  const [user, setUser] = useState({});
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const pairId = pair.userId;
  const [fullCon, setFullCon] = useState([]);
  const conversationContainerRef = useRef(null);
  const messageEndRef = useRef(null);

  //works
  useEffect(() => {
    async function fetchPairs() {
      try {
        const response = await axios.get(
          `http://localhost:8001/user/get-profile-picture-and-name/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching pairs:", error);
      }
    }
    async function fetchConversation() {
      try {
        const response = await axios.get(
          `http://localhost:8001/user/get-messages/${userId}/${pairId}`
        );

        const updatedConversation = response.data.messages.map((message) => ({
          ...message
        }));

        setConversation(updatedConversation);
        setFullCon(response.data);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    }

   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });

    if (userId) {
      fetchPairs();
      fetchConversation();
    }

  }, [userId, pairId]);

  

  function clickedBack() {
    window.history.back();
  }

  //works
  function handleSendMessage() {
    if (newMessage.trim() !== "") {
      const content = newMessage;
      axios
        .post(`http://localhost:8001/user/send-message/${userId}/${pairId}`, {
          content,
          conversationId: fullCon.conversationId,
        })
        .then((response) => {
          console.log("Message sent:", response.data.newMessage.content);
          const newMessage = response.data.newMessage;
          newMessage.timestamp = newMessage.timestamp.toString();
          setConversation([...conversation, newMessage]);
          setNewMessage("");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      handleSendMessage(); 
    }
  };

  return (
    <div className={styles.messagesPageContainer}>
      <AppBar
        position="sticky"
        style={{ backgroundColor: "rgba(231, 48, 45, 255)" }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={clickedBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={`${styles.headerText} ${styles.noTextHighlight}`}
          >
            {pair.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={styles.conversationContainer} ref={conversationContainerRef}>
        {conversation.map((message, index) => {
          const isSentByUser = message.sender.userId === userId;
          return (
            <div
              key={index}
              className={`${styles.message} ${
                isSentByUser ? styles.sentMessage : styles.recievedMessage
              }`}
            >
              {message.content}
            </div>
          );
        })}
      </div>

      <div ref={messageEndRef} />

      <div className={styles.sendMessageContainer} >
      <TextField
       label="Message"
       multiline
       maxRows={4}
        placeholder="Type a message..."
        variant="outlined"
        size="small"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        inputProps={{
          style: {
            caretColor: "black", 
            overflowWrap: "break-word", 
            wordBreak: "break-all", 
          },
        }}
      />
      <IconButton onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </div>
    </div>
  );
}
