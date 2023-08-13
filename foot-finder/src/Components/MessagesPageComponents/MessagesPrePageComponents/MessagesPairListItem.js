import React from 'react';
import styles from '../MessagesPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function MessagesPairListItem({ pair }) {
  const navigate = useNavigate();

  function goToDMs() {
    navigate('/individual-messages', { state:  {pair}  });
  }

  return (
    <div className={styles.messagesPairListItem} onClick={goToDMs}>
      <img src={pair.profilePicture} alt={pair.name} />
      <div className={styles.pairDetails}>
        <div className={styles.pairText}>
          <h3>{pair.name}</h3>
          <p>Last message preview...</p>
        </div>
       
      </div>
    </div>
  );
}
