import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./App.css";

const Home = () => {
  const [picture, setPicture] = useState(null);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setPicture(event.target.files[0]);
  };
  return (
    <>
      <label htmlFor="file">File Input</label>
      <input id="file" type="file" onChange={handleFileChange} />
      <br />
      <Link to="/login">Login</Link>
      <Link to="/protected">Protected</Link>
    </>
  );
};

const Protected = ({ token }) => {
  return <p>Yes: {token}</p>;
};

const Login = ({ handleToken }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    handleToken("blabla");
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };
  return <button onClick={handleClick}>Login</button>;
};

function App() {
  const [token, handleToken] = useState(null);

  console.log("Test");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/protected"
            element={
              token ? (
                <Protected token={token} />
              ) : (
                <Navigate to="/login" state={{ from: "/protected" }} />
              )
            }
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
