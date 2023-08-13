import React from 'react';
import styles from './Header.module.css'; // Import the CSS module file
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Logo from '../../Assets/Images/Logos/FoodFinderLogo.png';
import ChatIcon from '@mui/icons-material/Chat';

function Header({ handleProfileButtonClick, handlelogoutclick, handleMessagesClick}) {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className={styles.header}>

        <IconButton onClick={handleProfileButtonClick} handlelogoutclick={handlelogoutclick}>
          <PersonIcon fontSize='large' className={styles.header__icon} />
        </IconButton>
        
        <IconButton onClick={refreshPage}>
         <img className={styles.header__logo} src={Logo}  alt="foodfinder" />
        </IconButton>

        <IconButton onClick={handleMessagesClick}>
          <ChatIcon fontSize='large' className={styles.header__icon} />
        </IconButton>

    </div>
     
  )
}

export default Header;
