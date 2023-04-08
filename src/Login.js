import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./global";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginData = {
    email: email,
    password: password,
  };

  const [logIn, setLogIn] = useState({});

  const CheckCredentials = () => {
    let res = fetch(`${API}/users/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "content-type": "application/json",
      },
    });
    res
      .then((data) => data.json())
      .then((response) => handleFinalResult(response));
  };
  const handleFinalResult = (user) => {
    setLogIn(user);
    alert(user.message);
  };
  async function checkLogin() {
    if (logIn.message === "Successfull Login") {
      localStorage.setItem("id", logIn.id);
      localStorage.setItem("isLogin", true);
      navigate("/home");
    }
  }
  useEffect(() => {
    checkLogin();
  }, [logIn]);

  useEffect(() => {
    let isAuth = localStorage.getItem("isLogin");
    if (isAuth && isAuth !== null) {
      navigate("/home");
    }
  });
  return (
    <div className="loginContainer">
      <h2>Sign In</h2>
      <form className="loginForm">
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          id="passwordInput"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="signInButton"
          onClick={() => CheckCredentials()}
          type="button"
        >
          SignIn
        </button>
      </form>
    </div>
  );
}
