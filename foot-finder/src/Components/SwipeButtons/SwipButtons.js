import React from 'react';
import styles from './SwipeButtons.module.css'; // Import the CSS module file
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function SwipButtons({  tinderCardRef, setIndex, haveCandidates }) {
  
  const handleSwipeLeft = () => {
    if(!haveCandidates) {
      return;
    }
    tinderCardRef.current.swipe('left');
  };

  const handleSwipeRight = () => {
    if(!haveCandidates) {
      return;
    }
    tinderCardRef.current.swipe('right');
    console.log(tinderCardRef.current);
  };

  function nextInterest() {
    setIndex((prevIndex) => (prevIndex + 1));
  }

  function beforeInterest() {
    setIndex((prevIndex) => (prevIndex - 1));
  }

  return (
    <div className={styles.swipeButtons}>
      <IconButton className={styles.swipeButtons__button + " " + styles.swipeButtons__left} onClick={handleSwipeLeft}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButtons__button + " " + styles.swipeButtons__before} onClick={beforeInterest}>
        <NavigateBeforeIcon fontSize="inheret" style={{fontSize: 50}} />
      </IconButton>
      <IconButton className={styles.swipeButtons__button + " " + styles.swipeButtons__next} onClick={nextInterest}>
        <NavigateNextIcon fontSize="inheret" style={{fontSize: 50}}/>
      </IconButton>
      <IconButton className={styles.swipeButtons__button + " " + styles.swipeButtons__right} onClick={handleSwipeRight}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default SwipButtons;
