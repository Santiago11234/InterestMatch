import React, { useState, useRef } from 'react';
import Header from '../Components/Header/Header';
import SwipButtons from '../Components/SwipeButtons/SwipButtons';
import TinderCards from '../Components/TinderCards/TinderCards';
import ProfileSlideIn from '../Components/ProfileSlideIn/ProfileSlideIn'; 
import { useNavigate } from 'react-router-dom';

export default function HomePage({ userId, handlelogoutclick }) {
  const tinderCardRef = useRef(null);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [interestIndex, setInterestIndex] = useState(1);

  const handleProfileButtonClick = () => {
    setProfileOpen((prevState) => !prevState); 
  };

  const handleCloseProfile = () => {
    setProfileOpen(false); 
  };

  function goToLogIn() {
    navigate('/')
    handlelogoutclick();
  }

  function goToSettings() {
    navigate('/settings')
  }
  function goToProfile() {
    navigate('/profile')
  }

  function goToMessages() {
    navigate('/messages');
  }




 
  return (
    <div style={{'overflow': 'hidden'}} >
      <Header handleProfileButtonClick={handleProfileButtonClick} handleMessagesClick={goToMessages} />
      <TinderCards tinderCardRef={tinderCardRef}  userId={userId}  index={interestIndex}/>
      <SwipButtons tinderCardRef={tinderCardRef} setIndex={setInterestIndex}  />
     
      <ProfileSlideIn open={isProfileOpen} handlelogoutclick={goToLogIn} onClose={handleCloseProfile} returnToSettings={goToSettings} returnToProfile={goToProfile} />
    </div>
  );
}
