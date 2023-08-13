
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../SettingsPage.module.css';

const ProfileSidebar = ({ selectedSetting, onSettingChange }) => {
  const settingsList = [
    'my-account',
    'profile',
    'privacy-security',
    'devices',
    'subscription',
    'payment-methods',
    'appearance',
    'accessibility',
    'voice-video',
    'text-images',
    'notifications',
    'language',
    'whats-new',
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>Settings</h2>
      </div>
      <ul className={styles.sidebarMenu}>
        {settingsList.map((setting) => (
          <li
            key={setting}
            className={selectedSetting === setting ? styles.active : ''}
            onClick={() => onSettingChange(setting)}
          >
            <Link to={`/settings/${setting}`}>{setting}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
