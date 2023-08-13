import React from 'react';
import { Button } from '@mui/material';
import ProfileButton from './ProfileButton';
import styles from './ProfilePage.module.css';
import Food from './Components/Food';
import Vacation from './Components/Vacation';
import Music from './Components/Music';
import Job from './Components/Job';
import Hobby from './Components/Hobby';
import PersonalInfo from './Components/PersonalInfo';

const ButtonRow = ({ onButtonClick }) => {
  const buttons = [
    { color: 'rgba(231, 48, 45, 1)', label: 'Personal', content: <PersonalInfo /> },
    { color: 'rgba(231, 48, 45, 1)', label: 'Food', content: <Food /> },
    { color: 'rgba(243, 118, 45, 1)', label: 'Travel', content: <Vacation /> },
    { color: 'rgba(248, 160, 45, 1)', label: 'Music', content: <Music /> },
    { color: 'rgba(251, 177, 45, 1)', label: 'Job', content: <Job /> },
    { color: 'rgba(253, 187, 45, 1)', label: 'Hobby', content: <Hobby /> },
  ];
  

  return (
    <div className={styles.buttonRowContainer}>
      <div className={styles.buttonRow}>
        {buttons.map((button, index) => (
          <ProfileButton key={index} color={button.color} label={button.label} onClick={() => onButtonClick(button.content)} />
        ))}
      </div>
    </div>
  );
};

export default ButtonRow;
