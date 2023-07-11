import React, { useState, useEffect } from "react";
import "./AuthenticationPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthenticationPage = () => {
  const messageValues = [
    "Don't have an account yet? Sign Up",
    "Already have an account? Sign In",
  ];
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [signUpButton, setSignUpButton] = useState(messageValues[0]);
  const [submitButton, setSubmitButton] = useState("Sign In");
  const navigate = useNavigate();

  const setPasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const navigatePage = () => {
    navigate(`/home/${userName}`);
  };

  //to check the login status.
  const handleButtonClick = async () => {
    const formData = {
      userName: userName,
      password: password,
    };
    const url = submitButton === "Sign In" ? "login" : "registerUser";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}${url}`,
        formData
      );
      if (response.status !== 201)
        window.alert(`${response.data.msg}. Please try again`);
      else if (url === "login") {
        navigatePage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to update the text displayed on the SignUp/SignIn button.
  useEffect(() => {
    if (signUpButton === "Don't have an account yet? Sign Up") {
      setSubmitButton("Sign In");
    } else {
      setSubmitButton("Sign Up");
    }
  }, [signUpButton]);

  //to handle the state of signup button. can be either signup or signin
  const handleSignUp = () => {
    const messages =
      signUpButton === messageValues[0] ? messageValues[1] : messageValues[0];
    setSignUpButton(messages);
  };

  return (
    <div className="auth-macbook-air">
      <div className="auth-overlap-wrapper">
        <h1 className="signature">
          Created by{" "}
          <a href="https://github.com/vermashaurya24" target="_blank">
            Shaurya
          </a>{" "}
          and{" "}
          <a href="https://github.com/NeerajHazarika" target="_blank">
            Neeraj
          </a>{" "}
        </h1>
        <div className="auth-overlap">
          <div className="auth-login-signup">
            <div className="sign-in-button">
              <div className="div-wrapper">
                <button className="button" onClick={handleButtonClick}>
                  {submitButton}
                </button>
              </div>
            </div>
            <div className="password-input-field">
              <input
                type="password"
                id="password"
                className="overlap-2"
                value={password}
                onChange={setPasswordChange}
              />
            </div>
            <div className="auth-text-wrapper-2">Password</div>
            <div className="email-address-input">
              <input
                type="text"
                className="overlap-2"
                onChange={handleUsernameChange}
              />
            </div>
            <div className="auth-text-wrapper-4">User Name</div>
            <p className="don-t-have-an">
              <button className="auth-text-wrapper-7" onClick={handleSignUp}>
                {signUpButton}
              </button>
            </p>
            <div className="auth-text-wrapper-8">Welcome back</div>
            <p className="auth-text-wrapper-9">
              Please enter your details to sign in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
