import { Button, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fireBaseAuthentication,
  fireBaseDataBase,
} from "../../FireBase/fireBaseHandler";
import "./resume.css";
function Resume() {
  const [resume, setResume] = useState();
  const nav = useNavigate();
  let uid;

  useEffect(() => {
    onAuthStateChanged(fireBaseAuthentication, (user) => {
      if (user) {
        fetchData(user.uid);
      } else {
        nav("/login");
      }
    });
  }, []);

  const fetchData = (id) => {
    console.log(id);
    const dataBaseRef = ref(fireBaseDataBase, `users/${id}/resume`);
    onValue(dataBaseRef, (snapshot) => {
      setResume(snapshot.val());
    });
  };

  return (
    <div>
      {resume && (
        <div className="resume-container">
          <Link to="/details">
            <Button>Change resume</Button>
          </Link>
          <h1>{resume.name}</h1>
          <div className="header">
            <div className="personal-info-container">
              <div className="image">
                <img src={resume.imgURl} alt="" width={"300px"} />
              </div>
              <h5>Email:</h5>
              <p>{resume.email}</p>
              <h5>Phone:</h5>
              <p>{resume.phone}</p>
            </div>
            <div className="about-container">
              <div className="about"></div>
              <Typography variant="h3">About:</Typography>
              <p>{resume.about}</p>
            </div>
          </div>
          <div className="skills-projects">
            <div className="skills">
              <h3>Skills</h3>
              {resume.skills.map((skill) => {
                return <p>{skill}</p>;
              })}
            </div>
            <div className="projects">
              <h3>Projects</h3>
              {resume.projects.map((project) => {
                return <p>{project}</p>;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
