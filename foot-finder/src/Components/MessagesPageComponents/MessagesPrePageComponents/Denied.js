import React from "react";
import styles from "../MessagesPage.module.css";
import { Modal } from "@mui/material";

export default function Denied() {
  return (
    <div>
      <Modal
        open={true}
        className={styles.modalPage}
        disableEnforceFocus
        hideBackdrop
      >
        <div className={styles.otherModalContent}>
          <h2>You have no denied requests</h2>
        </div>
      </Modal>
    </div>
  );
}
