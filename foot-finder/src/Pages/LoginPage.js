import React from 'react';
import LoginCard from '../Components/LoginComponents/LoginCardComponents/LoginCard';
import styles from '../Components/LoginComponents/LoginCardComponents/LoginCard.module.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ( { setUserId}) => {
  const navigate = useNavigate();

  function goToHome() {
    navigate('/home');
  }

  return (
    <div className={styles.loginBody}> 
      <LoginCard goToHome={goToHome} setUserId={setUserId} /> 
    </div>
  );
};

export default LoginPage;
