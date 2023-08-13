import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import TermsIcon from '@mui/icons-material/Gavel';
import ProfileIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSwipeable } from 'react-swipeable';
import styles from './ProfileSlideIn.module.css';
const ProfileSlideIn = ({ open, onClose, handlelogoutclick, returnToSettings, returnToProfile }) => {
  const [backButtonClicked, setBackButtonClicked] = useState(false);

  function handleBackClick() {
    setBackButtonClicked(true);
    setTimeout(() => {
      setBackButtonClicked(false);
    }, 200);
    onClose();
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setBackButtonClicked(true);
      setTimeout(() => {
        setBackButtonClicked(false);
        onClose();
      }, 5);
    },
  });

  return (
    <div className={`${styles['profile-slide-in']} ${open ? styles.open : ''}`} {...handlers}>
      <div className={`${styles['profile-container']}`}>
        <IconButton
          className={`${styles['back-button']} ${backButtonClicked ? styles.clicked : ''}`}
          onClick={handleBackClick}
        >
          <ArrowBackIcon />
        </IconButton>

        <div className={styles['list-container']}>
          <List>
            <ListItem button onClick={returnToProfile} >
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" onClick={returnToSettings}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <TermsIcon />
              </ListItemIcon>
              <ListItemText primary="Terms of Service" />
            </ListItem>
            <ListItem button onClick={handlelogoutclick} >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>

          </List>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlideIn;
