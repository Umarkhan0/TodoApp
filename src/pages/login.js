import "../App.css";
import { NavLink , useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "../config/Firebase.js";
// import { useNavigate } from "react-router-dom";

function Login() {
  const navigateHome = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigateHome('/home')
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  return (
    <div className="login-main-contaner">
      <div className="container">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label for="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your Email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              let emailElement = document.getElementById("username");
              let PasswordElement = document.getElementById("password");
              let spinner = document.querySelector(".spinner");
              let card = document.querySelector(".container");
              spinner.style.display = "block";
              card.style.filter = "blur(4px)";
              card.style.pointerEvents = "none";

              e.preventDefault();
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  navigate('/home')
                  const user = userCredential.user;
                  // ...
                  spinner.style.display = "none";
                  PasswordElement.style.outline = "unset";
                  PasswordElement.blur();
                  card.style.filter = "unset";
                  card.style.pointerEvents = "unset";

                  emailElement.style.outline = "unset";
                  setPassword("");
                  setEmail("");
                  console.log(user);
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage);
                  errorMessage == "Firebase: Error (auth/user-not-found)." ||
                  errorMessage == "Firebase: Error (auth/invalid-email)."
                    ? (() => {
                        emailElement.style.outline = "2px solid red";
                        emailElement.focus();
                        spinner.style.display = "none";
                        card.style.filter = "unset";
                        card.style.pointerEvents = "unset";
                      })()
                    : (emailElement.style.outline = "unset");
                  emailElement.blur();

                  errorMessage == "Firebase: Error (auth/wrong-password)." ||
                  errorMessage == "Firebase: Error (auth/missing-password)."
                    ? (() => {
                        PasswordElement.style.outline = "2px solid red";
                        spinner.style.display = "none";
                        card.style.filter = "unset";
                        card.style.pointerEvents = "unset";
                        PasswordElement.focus();
                      })()
                    : (() => {
                        PasswordElement.blur();
                        PasswordElement.style.outline = "unset";
                      })();
                });
            }}
          >
            Login
          </button>
        </form>
        <div class="switch">
          <NavLink to={"/signUp"}>
            <p>Don't have an account? Sign Up</p>
          </NavLink>
        </div>
      </div>
      <div className="spinner" id="sppiner">
        <div className="spinnerin"></div>
      </div>
    </div>
  );
}
export default Login;
