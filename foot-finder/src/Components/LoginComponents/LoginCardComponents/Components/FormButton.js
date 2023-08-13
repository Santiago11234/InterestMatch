import React from "react";
import styles from '../LoginCard.module.css';

export default function FormButton({  signUp,  onSignUp }) {
  return (
    <div className={styles.logInButtons}>
      <div id="button" className={styles.row}>
        <button onClick={onSignUp}>{signUp}</button>
      </div>
    </div>
  );
}
