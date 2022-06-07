import { Button, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/0663_resume.webp";
import { fireBaseAuthentication } from "../../FireBase/fireBaseHandler";

function Login() {
  const [userDetails, setUserDetails] = useState({});
  const nav = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(
      fireBaseAuthentication,
      userDetails.email,
      userDetails.password
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
    setUserDetails({ ...userDetails, [name]: value });
  };
  return (
    <div className="ls-container">
      <div className="img-container">
        <img src={logo} alt="" className="img" />
      </div>
      <div className="cred-container">
        <Typography sx={{ marginBottom: 2, width: 300 }} variant="h5">
          Welcome back !!!
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
          onClick={handleLogin}
          sx={{ marginBottom: 2 }}
          variant="contained"
          label=""
        >
          Login
        </Button>
        <Typography>Dont have an account ?</Typography>
        <Link to="/signUp">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
