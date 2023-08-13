import React, { useState } from 'react';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import Logo from '../Assets/Images/Logos/FoodFinderLogo.png';
import { useNavigate } from 'react-router-dom';
import ButtonRow from '../Components/ProfilePageComponents/ButtonRow';
import styles from '../Components/ProfilePageComponents/ProfilePage.module.css';
import PersonalInfo from '../Components/ProfilePageComponents/Components/PersonalInfo';

export default function ProfilePage( {userId} ) {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState(<PersonalInfo userId={userId} />);


  const handleBackClick = () => { 
    navigate('/home');
  };

  const handleButtonClick = (contentComponent) => {
    setSelectedContent(() => React.cloneElement(contentComponent, { userId: userId }));
  };
  

  return (
    <div className={styles.profilePageBg}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '10px', alignItems: 'center' }}>
        <IconButton onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>
        <Grid item>
          <img src={Logo} alt="Logo" style={{ width: '40px', height: '40px' }} />
        </Grid>
        <IconButton>
        </IconButton>
      </Grid>
      <Typography variant="h4" align="center">
        Profile
      </Typography>
      
      <ButtonRow onButtonClick={handleButtonClick} />

      {selectedContent && (
        <div className={styles.contentCard}>
          {React.cloneElement(selectedContent, { userId: userId })}
        </div>
      )}
 
    </div>
  );
}
