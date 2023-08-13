import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import MessagesPage from './Pages/MessagesPage';
import IndividMessages from './Components/MessagesPageComponents/IndividMessages';

//I need this comment to deploy
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  const theme = createTheme({});

  const handleLogin = (userId) => {
    setUserId(userId);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserId('');
    setIsLoggedIn(false);
    console.log('logged out')
  };

  return (
    <Router  basename="/">
      <ThemeProvider theme={theme}>
        <Routes>
          {isLoggedIn ? (
            <Route
              path="home"
              element={<HomePage userId={userId} handlelogoutclick={handleLogout} />}
            />
          ) : (
            <Route
              path=""
              element={<LoginPage setUserId={handleLogin} />}
            />
          )}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage  userId={userId} />} />
          <Route path="messages" element={<MessagesPage  userId={userId} />} />
          <Route path="individual-messages" element={<IndividMessages  userId={userId}  />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
