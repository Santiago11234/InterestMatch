import React, { useState } from "react";
import styles from "./LoginCard.module.css";
import FormButton from "./Components/FormButton";
import FormHeaderComponent from "./Components/FormHeaderComponent";
import FormInput from "./Components/FormInput";
import FormOtherMethods from "./Components/FormOtherMethods";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginCard = ({ goToHome, setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8001/user/login", {
        username,
        password,
      });
      const { userId } = response.data;
      setUserId(userId);
      goToHome();
    } catch (error) {
      alert("Incorrect username or password");
      console.error("Error logging in:", error);
    }
  };

  const handleSignUp = async () => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Email is invalid");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8001/user/register", {
        username,
        email,
        password,
      });

      const { userId } = response.data;
      setUserId(userId);

      console.log("User registered successfully:", response.data.message);
      goToHome();
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isSignUp) {
        handleSignUp();
      } else {
        handleLogin();
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.loginform}>
      <div style={{ marginLeft: "10px" }} onClick={toggleSignUp}>
        <p>
          <u>{isSignUp ? "Back to Log In" : ""}</u>
        </p>
      </div>
      <FormHeaderComponent title={isSignUp ? "Sign Up" : "Login"} />
      <FormInput
        key="username"
        id="username"
        description="Username"
        placeholder="Enter your username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {isSignUp && (
        <>
          <FormInput
            key="email"
            id="email"
            description="Email"
            placeholder="Enter your email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            key="password"
            id="password"
            description="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            key="confirmPassword"
            id="confirmPassword"
            description="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormButton signUp={"Sign Up"} onSignUp={handleSignUp} />
        </>
      )}
      {!isSignUp && (
        <>
          <FormInput
            key="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormButton signUp={"Log In"} onSignUp={handleLogin} />
          <FormButton signUp={"Sign Up"} onSignUp={toggleSignUp} />
        </>
      )}

      <FormOtherMethods />
    </div>
  );
};

export default LoginCard;
