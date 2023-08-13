import React, {useState} from 'react';
import styles from '../MessagesPage.module.css';
import axios from '../../../Services/axios';

export default function MessagesPairListItem({ userId, pair }) {
  const [active , setActive] = useState(true);
  
  const handleInterest = (isGood) => {
    const isPair = isGood;
    const candidateId = pair.userId;
    axios.delete(`${process.env.REACT_APP_API_URL}/user/delete-request/${userId}`, {
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

  return (
    <div>
    {active ? 
      <div className={styles.messagesPairListItem}>
      <img src={pair.profilePicture} alt={pair.name} />
      <div className={styles.pairDetails}>
        <div className={styles.pairText}>
          <h3>{pair.name}</h3>
          <p>Your new love interst</p>
        </div>
        <button
          className={styles.acceptInterestButton}
          onClick={() => handleInterest(true)} 
        >
          Accept
        </button>
      </div>
    </div>
    : null}
  
  </div>
  );
}
