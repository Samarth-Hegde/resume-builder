import { TextField, Typography, Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fireBaseAuthentication,
  fireBaseDataBase,
  fireBaseStorage,
} from "../../FireBase/fireBaseHandler";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { ref, set } from "firebase/database";
import "./details.css";

function Details() {
  const [details, setDetails] = useState({
    skills: [],
    projects: [],
  });
  const [image, setImage] = useState();
  const [check, setCheck] = useState(false);
  const [uid, setUid] = useState();
  const [projects, setProjects] = useState("");
  const [skills, setSkills] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    onAuthStateChanged(fireBaseAuthentication, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        nav("/login");
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleImage = async (e) => {
    const storageReference = storageRef(
      fireBaseStorage,
      `/${new Date().getTime()}`
    );
    await uploadBytes(storageReference, e.target.files[0]);
    const imgURL = await getDownloadURL(storageReference);
    const { name } = e.target;
    setDetails({ ...details, [name]: imgURL });
    alert("File uploaded");
  };

  const handleSave = async () => {
    if (!details.name) {
      setCheck(false);
      alert("Name is required");
      return;
    } else if (!details.about) {
      setCheck(false);
      alert("about is required");
      return;
    } else if (!details.email) {
      setCheck(false);
      alert("Email is required");
      return;
    }
    setCheck(true);
    const databaseRef = ref(fireBaseDataBase, `users/${uid}/resume`);
    await set(databaseRef, details);
    nav("/resume");
  };

  const handleChangeProjects = (e) => {
    setProjects(e.target.value);
  };
  const handleChangeSkills = (e) => {
    setSkills(e.target.value);
  };

  const handleClickSkills = (e) => {
    setDetails({ ...details, skills: [...details.skills, skills] });
    setSkills("");
  };
  const handleClickProjects = (e) => {
    setDetails({ ...details, projects: [...details.projects, projects] });
    setProjects("");
  };

  return (
    <div>
      <div className="form-container">
        <Typography variant="h3">Personal Info</Typography>
        <TextField
          sx={{ marginBottom: 3, width: 300 }}
          onChange={handleChange}
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 3, width: 300 }}
          id="outlined-basic"
          name="about"
          onChange={handleChange}
          label="About"
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 3, width: 300 }}
          onChange={handleChange}
          name="email"
          id="outlined-basic"
          label="Email"
          type="email"
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 3, width: 300 }}
          onChange={handleChange}
          name="phone"
          id="outlined-basic"
          label="Phone No"
          type="number"
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 3, width: 300 }}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          name="address"
          onChange={handleChange}
        />
        <Typography sx={{ marginBottom: 3, width: 300 }}>
          Upload Image
        </Typography>
        <input
          onChange={handleImage}
          accept="image/*"
          name="imgURl"
          type="file"
          style={{ backgroundColor: "#rgb(25,118,210)" }}
        />

        <Typography sx={{ marginBottom: 3, width: 300 }} variant="h3">
          Skills
        </Typography>
        <TextField
          sx={{ marginBottom: 3, width: 300 }}
          onChange={handleChangeSkills}
          value={skills}
          id="outlined-basic"
          label="Skill"
          variant="outlined"
        />
        <Button
          sx={{ marginBottom: 3, width: 300 }}
          onClick={handleClickSkills}
          variant="contained"
        >
          Add Skill
        </Button>
        <Typography sx={{ marginBottom: 3, width: 300 }} variant="h3">
          Projects
        </Typography>
        <TextField
          sx={{ marginBottom: 3, width: 300 }}
          onChange={handleChangeProjects}
          value={projects}
          id="outlined-basic"
          label="Project"
          variant="outlined"
        />
        <Button
          sx={{ marginBottom: 3, width: 300 }}
          onClick={handleClickProjects}
          variant="contained"
        >
          Add Project
        </Button>
        {setCheck && (
          <Button className="btn" onClick={handleSave} variant="contained">
            Save and view
          </Button>
        )}
      </div>
    </div>
  );
}

export default Details;
