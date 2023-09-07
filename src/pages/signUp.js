import { NavLink } from "react-router-dom";
import { useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

import {
    auth,
    createUserWithEmailAndPassword,
    db,
    setDoc,
    doc
} from "../config/Firebase";
let SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="sign-up-container">
            <div className="card">
                <h1>Sign Up</h1>
                <form>
                    <div className ="form-group">
                        <label for="signup-username">Name</label>
                        <input
                            type="text"
                            id="signup-username"
                            name="signup-username"
                            required
                            placeholder="Your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className ="form-group">
                        <label for="signup-username">Email</label>
                        <input
                            type="text"
                            id="signup-email"
                            name="signup-username"
                            required
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className ="form-group">
                        <label for="signup-password">Password</label>
                        <input
                            type="password"
                            id="signup-password"
                            name="signup-password"
                            required
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={(e) => {
                            let userNameinput = document.getElementById("signup-username");
                            let signUpEmailInput = document.getElementById("signup-email");
                            let passwordInput = document.getElementById("signup-password");
                            let spinner = document.getElementById("sppiner");
                            let card = document.querySelector(".card");
                            spinner.style.display = "block";
                            card.style.filter = "blur(4px)";
                            card.style.pointerEvents = "none";
                            e.preventDefault();
                            console.log(username);
                            console.log(email);
                            console.log(password);

                            if (username.length > 4) {
                                userNameinput.style.outline = "none";

                                createUserWithEmailAndPassword(auth, email, password)
                                    .then(async (userCredential) => {
                                       passwordInput.style.outline = "none";
                                       signUpEmailInput.style.outline = "none"
                                       userNameinput.style.outline = "none"

                                        // Signed in
                                        const user = userCredential.user;
                                        console.log(user);
                                        await setDoc(doc(db, "users", user.uid)
                                            , {
                                            username,
                                            email,
                                        });

                                        console.log("Document written with ID: ", user.uid);

                                        setPassword("");
                                        setUsername("");
                                        setEmail("");
                                        // ...
                                        spinner.style.display = "none";
                                        card.style.filter = "unset";
                                        card.style.pointerEvents = "unset";
                                        signUpEmailInput.blur();
                                        signUpEmailInput.style.outline = "none";
                                        passwordInput.style.outline = "none";
                                        navigate('/home')
                                    })
                                    .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        console.log(errorMessage);
                                        errorMessage == 'Firebase: Error (auth/email-already-in-use).'
                                            ?(() => {
                                                swal('Oops', 'Already use Email', 'error').then(() => {
                                                    signUpEmailInput.focus();
                                                    signUpEmailInput.style.outline = '2px solid red';
                                                    spinner.style.display = "none";
                                                    card.style.filter = "unset";
                                                    card.style.pointerEvents = "unset";
                                                });
                                            })()
                                            : (() => {
                                                signUpEmailInput.blur();
                                                signUpEmailInput.style.outline = 'none';
                                            })();

                                        if (
                                            errorMessage == "Firebase: Error (auth/invalid-email)."
                                        ) {
                                            signUpEmailInput.focus();
                                            signUpEmailInput.style.outline = "2px solid red";
                                            spinner.style.display = "none";
                                                    card.style.filter = "unset";
                                                    card.style.pointerEvents = "unset";
                                        } else {
                                            signUpEmailInput.blur();
                                            signUpEmailInput.style.outline = "none";
                                        }
                                        if (
                                            errorMessage ==
                                            "Firebase: Error (auth/missing-password)." ||
                                            errorMessage ==
                                            "Firebase: Password should be at least 6 characters (auth/weak-password)."
                                        ) {
                                            passwordInput.focus();
                                            passwordInput.style.outline = "2px solid red";
                                            spinner.style.display = "none";
                                                    card.style.filter = "unset";
                                                    card.style.pointerEvents = "unset";
                                        } else {
                                            passwordInput.blur();
                                            passwordInput.style.outline = "none";
                                        }
                                        // ..
                                    });
                            } else {
                                userNameinput.focus();
                                userNameinput.style.outline = "2px solid red";
                                spinner.style.display = "none";
                                                    card.style.filter = "unset";
                                                    card.style.pointerEvents = "unset";
                            }
                        }}
                    >
                        Sign Up
                    </button>
                </form>
                <div class="switch">
                    <NavLink to={"/login"}>
                        {" "}
                        <p>Already have an account? Login</p>
                    </NavLink>
                </div>
            </div>
            <div className="spinner" id="sppiner">
                <div className="spinnerin"></div>
            </div>
        </div>
    );
};
export default SignUp;
