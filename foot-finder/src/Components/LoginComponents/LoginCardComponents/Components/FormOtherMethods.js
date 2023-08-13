import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import styles from '../LoginCard.module.css';

export default function FormOtherMethods() {
  return (
    <div className={styles.alternativeLogin}>
      <label>Or sign in with:</label>
      <div className={styles.buttonContainer}>
        <IconButton className={styles.facebookIcon}>
          <FacebookIcon fontSize='large' />
        </IconButton>
        <IconButton className={styles.twitterIcon}>
          <TwitterIcon />
        </IconButton>
        <IconButton className={styles.googleIcon}>
          <GoogleIcon />
        </IconButton>
      </div>
    </div>
  );
}
