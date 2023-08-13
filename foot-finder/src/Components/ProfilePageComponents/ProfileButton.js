import React from 'react';
import { Button } from '@mui/material';
import styles from './ProfilePage.module.css';

const ButtonComponent = ({ color, label, onClick }) => {
  return (
    <Button className={styles.button} variant="contained" style={{ backgroundColor: color, minWidth: '100px', margin: '7px' }} onClick={onClick}>
      {label}
    </Button>
  );
};

export default ButtonComponent;
