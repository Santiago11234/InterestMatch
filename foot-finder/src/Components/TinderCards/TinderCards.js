import React, { useEffect, useState } from "react";
import styles from "./TinderCards.module.css";
import TinderCard from "react-tinder-card";
import axios from "../../Services/axios";

function TinderCards({ tinderCardRef, userId, index, haveCandidates }) {
  const [candidates, setCandidates] = useState([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}user/get-candidates/${userId}`
        );
        setCandidates(response.data);
        if(candidates.length !== 0) {
          haveCandidates(true);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    }
    if (userId) {
      fetchCandidates();
    }
  }, [userId]);

  useEffect(() => {
    setCurrentInterestIndex((index + 100) % 5);
  }, [index]);

  const handleCardSwipe = (dir) => {
    var isPair = false;
    if(dir === "right") {
      isPair= true;
    }

      const candidateId = candidates[currentCandidateIndex].userId;
      axios.delete(`${process.env.REACT_APP_API_URL}user/delete-candidate/${candidateId}`, {
          data: {
            isPair: isPair,
            candidateId: userId,
          },
        })
        .then(() => {
          console.log(userId, "deleted candidate", candidateId);
          if(candidates.length === 0) {
            haveCandidates(false);
          }
        })
        .catch((error) => {
          console.error("Error deleting candidate:", error);
        });
    

    setCurrentCandidateIndex(
      (prevIndex) => (prevIndex + 1) % candidates.length
    );
    setCurrentInterestIndex(0);
  };

  const outOfFrame = (userId, dir) => {
    handleCardSwipe(dir);
    setTimeout(() => {
      const updatedCandidates = candidates.filter(
        (candidate) => candidate.userId !== userId
      );
      setCandidates(updatedCandidates);
    }, 100);
  };

  return (
    <div className={styles.tinderCards__cardContainer}>
      {candidates.length !== 0 ? (
        candidates.map((candidate, index) => (
          <TinderCard
            key={candidate.userId}
            ref={tinderCardRef}
            className={styles.tinderCards__swipe}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => {
              outOfFrame(candidate.userId, dir);
            }}
          >
            <div
              className={styles.tinderCards__card}
              style={{
                backgroundImage: `url(${
                  candidates[index]?.interests[currentInterestIndex]?.imgUrl ||
                  ""
                })`,
              }}
            >
              <div className={styles.tinderCards__top__shadow}>
                <h3>{candidate.name || ""}</h3>
              </div>
              <div className={styles.tinderCards__left__shadow}>
                <h3>
                  {candidate.interests[currentInterestIndex]?.title || ""}
                </h3>
                <div className={styles.tinderCards__description}>
                  <p>
                    {candidate.interests[currentInterestIndex]?.description ||
                      ""}
                  </p>
                </div>
              </div>
            </div>
          </TinderCard>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TinderCards;
