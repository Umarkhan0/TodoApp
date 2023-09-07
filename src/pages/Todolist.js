import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  doc,
  collection,
  db,
  auth,
  updateDoc,
  orderBy,
  serverTimestamp,
  onAuthStateChanged,
  onSnapshot,
  query,
  where,
  deleteDoc,
  signOut
} from "../config/Firebase";
// import {BrowserRouter ,  Routes , Route} from 'react-router-dom';

// import { orderBy } from 'firebase/firestore';
const TodoListPage = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoId, setId] = useState([]);
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {

      const uid = user.uid;
      // ...
    } else {
      // console.log("sign-out")
      setValue("")
      setTodos([])
      setId([])
      navigate('/login')
      // User is signed out
      // ...
    }
  });
 
  const [loder, setLoder] = useState(document.querySelector(".container-todo"));

  useEffect(() => {
    const keydownHandler = async (event) => {
      if (event.key === "Enter"  && value.trim()) {
        setValue("")
        setTodos([])
        setId([])
        // navigate('/login')
        setTodos([...todos, value]);
        setId([...todoId, todoId]);
        onAuthStateChanged(auth, async (user) => {
          if (user) {

            let dateFun = async () => {
              const { value: formValues } = await Swal.fire({
                title: "Multiple inputs",
                allowOutsideClick: false,
                html: '<input type="date" class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                  return document.querySelector(".swal2-input").value;
                },
              });

              if (formValues[0] && formValues[0] !== "") {
                console.log(formValues);
                // console.log(formValues[1]);

                const containerTodo = document.querySelector(".container-todo");
                if (containerTodo) {
                  containerTodo.style.filter = "blur(4px)";
                  document.querySelector(
                    ".container-todo",
                  ).style.pointerEvents = "none"
                }


                document.getElementById("sppinerupdate").style.display =
                  "block";
                const docRef = await addDoc(collection(db, "todos"), {
                  value: value,
                  email: user.email,
                  time: serverTimestamp(),
                  dueDate: formValues,
                  chack: false

                });
                console.log(
                  "Document written with ID: ",
                  docRef._key.path.segments[1],
                );
                const washingtonRef = doc(
                  db,
                  "todos",
                  docRef._key.path.segments[1],
                );
                await updateDoc(washingtonRef, {
                  Id: docRef._key.path.segments[1],
                });

                setValue("");
                // const containerTodo = document.querySelector(".container-todo");
                if (containerTodo) {
                document.querySelector(".main-container-todo").style.filter =
                  "unset";
                document.querySelector(
                  ".main-container-todo",
                ).style.pointerEvents = "unset";
                }


                
               let spiner2 = document.getElementById("sppinerupdate")
                if(spiner2){
                spiner2.style.display = "none";
                }
              } else {
                dateFun();
              }
            };
            




            setValue("")
            setTodos([])
            setId([])
           
            dateFun();
            
          } else {
            {/* <Navigate to={'/login'} /> */ }
            setValue("")
            setTodos([])
            setId([])
            // User is signed out
            // ...
          }
        });
      }
    };

    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [value]);
  // ...

  const displayTextarea = async (id) => {
    const text = await Swal.fire({
      input: "textarea",
      inputLabel: "Enter your text",
      inputPlaceholder: "Type your text here...",
      inputAttributes: {
        rows: 5,
      },
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then(async (newvalue) => {
      if (newvalue.value) {
        document.getElementById("sppinerupdate").style.display = "block";
        const containerTodo = document.querySelector(".container-todo");
                if (containerTodo) {
                  containerTodo.style.filter = "blur(4px)";
                  document.querySelector(
                    ".container-todo",
                  ).style.pointerEvents = "none"
                }

        const washingtonRef = doc(db, "todos", id);
        await updateDoc(washingtonRef, {
          value: newvalue.value,
        });
        console.log(id);
        document.getElementById("sppinerupdate").style.display = "none";
        // const containerTodo = document.querySelector(".container-todo");
        if (containerTodo) {
        document.querySelector(".main-container-todo").style.filter = "unset";
        document.querySelector(".main-container-todo").style.pointerEvents =
          "unset";
        }
      }
    });
  };

  let updtedChackValue = async (id) => {
    const washingtonRef = doc(db, "todos", id);
    document.getElementById("sppinerupdate").style.display = "block";
    const containerTodo = document.querySelector(".container-todo");
                if (containerTodo) {
                  containerTodo.style.filter = "blur(4px)";
                  document.querySelector(
                    ".container-todo",
                  ).style.pointerEvents = "none"
                }
    await updateDoc(washingtonRef, {
      chack: true
    });
    // const containerTodo = document.querySelector(".container-todo");
    if (containerTodo) {
    document.querySelector(".main-container-todo").style.filter =
      "unset";
    document.querySelector(
      ".main-container-todo",
    ).style.pointerEvents = "unset";
    }
    document.getElementById("sppinerupdate").style.display = "none";
    document.querySelector(".congragulation").style.display = "block"

    setTimeout(() => {
      document.querySelector(".congragulation").style.display = "none"
    }, 3000)
  }
  let signOutUser = () => {
    signOut(auth).then(() => {
      console.log("signout")
    }).catch((error) => {
    });
  }
  return (
    <div className="main">
      <div className="congragulation">
        <img width="95%" src="https://i.gifer.com/origin/09/09d203a3fd8c0667a58603018409a394.gif" />

      </div>
      <div className="loder-todo">

        <div className="spinner" id="sppinertodo" style={{ display: "block" }}>
          <div className="spinnerin"></div>
        </div>
      </div>

      <div className="main-container-todo">
        <div className="btn-container">
          <div className="btn-sign-out" onClick={
            () => signOutUser()
          }>Sign out</div>
        </div>
        <div className="container-todo">
          <h1>To-Do List</h1>

          <input
            type="text"
            className="custom-input"
            value={value}
            placeholder="Type something..."
            onChange={(e) => setValue(e.target.value)}
          />

          <ul className="todo-list">
            {todos.map((v, i) => (
              <div className="main-todo-item">
                <div className="time-container">
                  <span className="date-time">
                    {v[2] && v[2].toDate && typeof v[2].toDate === "function"
                      ? moment(
                        new Date(v[2].toDate()).toLocaleString(),
                      ).fromNow()
                      : ""}
                  </span>
                  <span className="date-time">
                    {v[3] && v[3]
                      ? `Days ${Number(new Date(v[3]).getDate()) - Number(new Date().getDate())
                      } / Month ${Number(new Date(v[3]).getMonth()) - Number(new Date().getMonth())
                      }`
                      : ""}
                  </span>
                </div>
                <li key={i}>
                  <input checked={v[4]} type="checkbox" id={i} />
                  <label className="label" htmlFor={i}
                    onClick={
                      () =>
                        updtedChackValue(v[1])
                    }
                  >
                    {v[0]}
                  </label>

                  <div onClick={() => displayTextarea(v[1])}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    onClick={async () => {
                      await deleteDoc(doc(db, "todos", v[1]));
                    }}
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </li>
              </div>
            ))}


          </ul>
          {useEffect(() => {
            // let mainPageTodos = document.querySelector(".container-todo");
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                const containerTodo = document.querySelector(".container-todo");
                if (containerTodo) {
                  containerTodo.style.filter = "blur(4px)";
                  document.querySelector(
                    ".container-todo",
                  ).style.pointerEvents = "none"
                }

                const q = query(
                  collection(db, "todos"),
                  where("email", "==", user.email),
                  orderBy("time", "desc"),
                );
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  const userTodos = [];
                  querySnapshot.forEach((doc) => {
                    userTodos.push([
                      doc.data().value,
                      doc.data().Id,
                      doc.data().time,
                      doc.data().dueDate,
                      doc.data().chack,
                    ]);
                  });
                  setTodos(userTodos);
                  const containerTodo = document.querySelector(".container-todo");
                  if (containerTodo) {
                  containerTodo.style.filter =
                    "unset"


                  document.querySelector(
                    ".container-todo",
                  ).style.pointerEvents = "unset"
                  }
                  let spinner = document.getElementById("sppinertodo");
                  if(spinner){
                  spinner.style.display = "none";
                  }
                });
              } else {
              };
            });
          }, [])}
        </div>
      </div>

      <div className="loder-todo" style={{ position: "fixed" }}>
        <div className="spinner" id="sppinerupdate">
          <div className="spinnerin"></div>
        </div>
      </div>
    </div>
  );
};
export default TodoListPage;
