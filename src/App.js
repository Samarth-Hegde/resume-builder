import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/home";
import Details from "./Pages/DetailsPage/details";
import Resume from "./Pages/ResumePage/resume";
import Login from "./Pages/LoginPage/login";
import SignUp from "./Pages/SignUpPage/signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/details" element={<Details />}></Route>
          <Route path="/resume" element={<Resume />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
