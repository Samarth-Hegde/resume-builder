import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../../Assets/0663_resume.webp";
import { fireBaseAuthentication } from "../../FireBase/fireBaseHandler";

import "./signup.css";

function SignUp() {
  const [user, setUser] = useState({});
  const nav = useNavigate();
  const handleSignUp = () => {
    createUserWithEmailAndPassword(
      fireBaseAuthentication,
      user.email,
      user.password
    )
      .then(() => {
        nav("/details");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="ls-container">
      <div className="img-container">
        <img src={logo} alt="" className="img" />
      </div>
      <div className="cred-container">
        <Typography
          onChange={handleChange}
          sx={{ marginBottom: 2, width: 300 }}
          variant="h5"
        >
          Welcome to Resume Builder
        </Typography>
        <TextField
          name="email"
          type={"email"}
          onChange={handleChange}
          sx={{ marginBottom: 2, width: 300 }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          name="password"
          type="password"
          onChange={handleChange}
          sx={{ marginBottom: 2, width: 300 }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button
          onClick={handleSignUp}
          sx={{ marginBottom: 2 }}
          variant="contained"
        >
          SignUp
        </Button>
        <Typography>Already have an account ?</Typography>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default SignUp;
