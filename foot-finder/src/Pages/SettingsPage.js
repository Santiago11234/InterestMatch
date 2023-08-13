import React, { useState } from 'react';
import styles from '../Components/SettingsPageComponents/SettingsPage.module.css';
import Sidebar from '../Components/SettingsPageComponents/SettingsSideBar/SettingsSideBar';
import ProfileChangeContent from '../Components/SettingsPageComponents/SettingsContent/SettingsChangeContent';

const SettingsPage = () => {
  const [selectedSetting, setSelectedSetting] = useState('my-account');

  const handleSettingChange = (setting) => {
    setSelectedSetting(setting);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.sidebarContainer}>
        <Sidebar selectedSetting={selectedSetting} onSettingChange={handleSettingChange} />
      </div>
      <div className={styles.contentContainer}>
        <ProfileChangeContent selectedSetting={selectedSetting} />
      </div>
    </div>
  );
};

export default SettingsPage;
