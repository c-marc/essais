import { useEffect, useState, useRef } from "react";
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
      <p>Yo</p>
      <label htmlFor="button">Text Input</label>
      <input id="button" type="button" onClick={() => console.log("yo")} />
      <br />
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

function TestSetState() {
  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    const dummy = async () => {
      let i = 0;
      while (i < 5 * 10 ** 9) {
        i++;
      }
      return true;
    };
    setDisabled(true);
    await dummy();
    console.log("disabled", disabled);
    console.log("react click");
  };

  return (
    <button disabled={disabled} onClick={handleClick}>
      Fake
    </button>
  );
}

function TestSetState2() {
  const [disabled, setDisabled] = useState(false);
  const myRef = useRef(false);

  console.log("react component says state", disabled);

  useEffect(() => {
    myRef.current.addEventListener("click", () =>
      console.log("ref says click")
    );
  }, []);

  const handleClick = async () => {
    const dummy = async () => {
      let i = 0;
      while (i < 5 * 10 ** 9) {
        i++;
      }
      return true;
    };
    console.log("handler says click");
    setDisabled(true);
    console.log("handler asked for state disabled true");
    console.log("handler says state disabled", disabled);
    console.log("handler says ref disabled", myRef.current.disabled);
    console.log("handler says await");
    await dummy();
    console.log("handler says await resolved");
    console.log("handler says state disabled", disabled);
    console.log("handler says ref disabled", myRef.current.disabled);
  };
}

function TestSetState3() {
  const [disabled, setDisabled] = useState(false);
  const myRef = useRef(false);

  console.log("react component says state", disabled);

  useEffect(() => {
    myRef.current.addEventListener("click", () =>
      console.log("ref says click")
    );
  }, []);

  const handleClick = () => {
    console.log("handler says click");
    setDisabled(true);
    console.log("handler asked for state disabled true");
    console.log("handler says state disabled", disabled);
    console.log("handler says ref disabled", myRef.current.disabled);
    console.log("handler says wait");
    let i = 0;
    while (i < 5 * 10 ** 9) {
      i++;
    }
    console.log("handler says wait resolved");
    console.log("handler says state disabled", disabled);
    console.log("handler says ref disabled", myRef.current.disabled);
  };

  return (
    <button ref={myRef} disabled={disabled} onClick={handleClick}>
      Fake
    </button>
  );
}

function TestSetState4() {
  const [disabled, setDisabled] = useState(false);
  const myRef = useRef();

  console.log("components says state disabled=", disabled);
  console.log("components says ref disabled=", myRef.current?.disabled);

  useEffect(() => {
    console.log("useEffect says state disabled=", disabled);
    console.log("useEffect says ref disabled=", myRef.current?.disabled);
  }, [disabled]);

  useEffect(() => {
    myRef.current.addEventListener("click", () =>
      console.log("ref says click")
    );
  }, []);

  const handleClick = async () => {
    const something = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Promise resolved");
          resolve(true);
        }, 5000);
      });
    };
    console.log("handler says click");
    setDisabled(true);
    console.log("handler asked for state disabled true");
    console.log("handler says state disabled=", disabled);
    console.log("handler says ref disabled=", myRef.current.disabled);
    console.log("handler says await");
    await something();
    console.log("handler says await resolved");
    console.log("handler says state disabled=", disabled);
    console.log("handler says ref disabled=", myRef.current.disabled);
  };

  return (
    <button ref={myRef} disabled={disabled} onClick={handleClick}>
      Fake
    </button>
  );
}

function App() {
  const [token, handleToken] = useState(null);

  console.log("Test App");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/test" element={<TestSetState4 />} />

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
