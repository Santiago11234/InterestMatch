import React from "react";
import Logo from "../../../../Assets/Images/Logos/FoodFinderLogo.png";
import IconButton from "@mui/material/IconButton";
import styles from '../LoginCard.module.css';

export default function FormheaderComponent({ title }) {
  return (
    <div className={styles.LoginHeader}>
      <img src={Logo} className={styles.LoginHeader__icon} alt="foodfinder" />
      <h2 id="headerTitle">{title}</h2>
    </div>
  );
}
