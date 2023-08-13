import React from 'react';
import styles from '../LoginCard.module.css';

export default function FormInput({ description, type, placeholder, value, onChange }) {
  return (
    <div className={styles.row}>
      <label>{description}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}
