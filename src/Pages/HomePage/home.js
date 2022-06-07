import { Button } from "@mui/material";
import React from "react";
import illustrationImage from "../../Assets/0663_resume.webp";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <nav className="navigation-menu">
        <Link to="/login">
          <Button sx={{ margin: "20px 20px" }} variant="contained">
            Login
          </Button>
        </Link>

        <Link to="/signUp">
          <Button sx={{ margin: "20px 20px" }} variant="contained">
            Sign Up
          </Button>
        </Link>
      </nav>
      <main>
        <div className="home__description-container">
          <h1>Lets Get You Hired</h1>
          <p>Create a job ready resume in minutes with Resume Builder</p>
          <Link to="/details">
            <Button sx={{ width: 250 }} variant="contained">
              Create My resume now
            </Button>
          </Link>
        </div>
        <div className="home__illustration-image-container">
          <img
            src={illustrationImage}
            alt=""
            className="home__illustration-image"
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
