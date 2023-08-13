import React, { useState, useEffect } from "react";
import axios from "../../../Services/axios";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../MessagesPage.module.css";

export default function MessagesHeader({
  clickedBack,
  changePage,
  userId,
  updateSearchText,
}) {
  const [activeSection, setActiveSection] = useState("Messages");
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pairSearchText, setPairSearchText] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen(true);
    handleSectionClick("Messages");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPairSearchText("");
  };

  const handleSearchTextChange = (event) => {
    const searchText = event.target.value;
    setPairSearchText(searchText);
    updateSearchText(searchText);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    const newPage = section;
    changePage(newPage);
  };

  useEffect(() => {
    async function fetchPairs() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}user/get-profile-picture-and-name/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching pairs:", error);
      }
    }
    if (userId) {
      fetchPairs();
    }
  }, [userId]);

  return (
    <div>
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
            {user.name}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleModalOpen}>
            <SaveAsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={`${styles.secondaryHeader}`}>
        <div
          className={`${styles.sectionText}  ${
            activeSection === "Messages" && styles.activeLeftSection
          }`}
          onClick={() => handleSectionClick("Messages")}
        >
          Messages
        </div>
        <div
          className={`${styles.sectionText}  ${
            activeSection === "Requests" && styles.activeMidSection
          }`}
          onClick={() => handleSectionClick("Requests")}
        >
          Requests
        </div>
        <div
          className={`${styles.sectionText} ${
            activeSection === "Denied" && styles.activeRightSection
          }`}
          onClick={() => handleSectionClick("Denied")}
        >
          Denied
        </div>
      </div>

      <Modal open={isModalOpen} className={styles.modalPageContainer} disableEnforceFocus hideBackdrop>
        <div className={styles.modalContent}>
          <TextField
            label="Search for a pair"
            variant="outlined"
            fullWidth
            value={pairSearchText}
            onChange={handleSearchTextChange}
          />
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </Modal>
    </div>
  );
}
