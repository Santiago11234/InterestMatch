import React, { useState, useEffect } from "react";
import styles from "../MessagesPage.module.css";
import axios from "../../../Services/axios";
import TinderCard from "react-tinder-card";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function MessagesPairListItem({ userId, pair }) {
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0);

  const handleInterest = (isGood) => {
    setOpen(false)
    const isPair = isGood;
    const candidateId = pair.userId;
    axios
      .delete(`${process.env.REACT_APP_API_URL}user/delete-request/${userId}`, {
        data: {
          isPair: isPair,
          candidateId: candidateId,
        },
      })
      .then(() => {
        console.log(userId, "deleted candidate", candidateId);
        setActive(false);
      })
      .catch((error) => {
        console.error("Error deleting candidate:", error);
      });
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  function nextInterest() {
    setCurrentInterestIndex((currentInterestIndex) => (currentInterestIndex + 101) % 5);
  }

  function beforeInterest() {
    setCurrentInterestIndex((currentInterestIndex) => (currentInterestIndex + 99) % 5);
  }

  return (
    <div>
      {active ? (
        <div className={styles.messagesPairListItem}>
          <img src={pair.profilePicture} alt={pair.name} />
          <div className={styles.pairDetails}>
            <div className={styles.pairText}>
              <h3>{pair.name}</h3>
              <p>Your new love interst</p>
            </div>
            <button
              className={styles.acceptInterestButton}
              onClick={() => toggleOpen()}
            >
             { open ? "Exit Profile " : "View Profile"}
            </button>
          </div>
        </div>
      ) : null}

      {open ? (
        <Modal open={open} hideBackdrop className={styles.requestModal}>
          <div>
            <TinderCard
              key={pair.userId}
              className={styles.tinderCards__swipe}
              preventSwipe={["up", "down", "left", "right"]}
            >
              <div
                className={styles.tinderCards__card}
                style={{
                  backgroundImage: `url(${
                    pair.interests[currentInterestIndex]?.imgUrl || ""
                  })`,
                }}
              >
                <div className={styles.tinderCards__top__shadow}>
                  <h3>{pair.name || ""}</h3>
                </div>
                <div className={styles.tinderCards__left__shadow}>
                  <h3>{pair.interests[currentInterestIndex]?.title || ""}</h3>
                  <div className={styles.tinderCards__description}>
                    <p>
                      {pair.interests[currentInterestIndex]?.description || ""}
                    </p>
                  </div>
                </div>
              </div> 
            </TinderCard>
            <div className={styles.swipeButtons}>
                  <IconButton className={styles.swipeButtons__button + " " + styles.swipeButtons__left} onClick={() => handleInterest(false)}>
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  <IconButton className={styles.swipeButtons__button + " " + styles.swipeButtons__before} onClick={beforeInterest}>
                    <NavigateBeforeIcon fontSize="inherit" style={{ fontSize: 50 }} />
                  </IconButton>
                  <IconButton className={styles.swipeButtons__button + " " + styles.swipeButtons__next} onClick={nextInterest}>
                    <NavigateNextIcon fontSize="inherit" style={{ fontSize: 50 }} />
                  </IconButton>
                  <IconButton className={styles.swipeButtons__button + " " + styles.swipeButtons__right}  onClick={() => handleInterest(true)}>
                    <FavoriteIcon fontSize="large" />
                  </IconButton>
              </div>

              </div>
            
        </Modal>
      ) : null}
    </div>
  );
}
