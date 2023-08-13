import React, { useEffect, useState } from 'react';
import axios from '../../../Services/axios';
import RequestPairListItem from './RequestPairListItem';
import styles from '../MessagesPage.module.css';
import { IconButton, Modal,TextField,} from "@mui/material";

export default function MessagesList({ userId }) {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    async function fetchPairs() {
      try {
        console.log(userId)
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/get-requests/${userId}`
        );
        setPairs(response.data);
      } catch (error) {
        console.error('Error fetching pairs:', error);
      }
    }
    if (userId) {
      fetchPairs();
    }
  }, [userId]);

  return (
    <div>
      {pairs.length !== 0 ? (
        pairs.map((pair, index) => (
          <RequestPairListItem key={index} pair={pair}  userId={userId}/>
        ))
      ) : (
        <Modal open={true} className={styles.otherModalPage} disableEnforceFocus hideBackdrop>
        <div className={styles.modalContent}>
          <h2>
            You have no requests
          </h2>
        </div>
      </Modal>
      )}
    </div>
  );
}
