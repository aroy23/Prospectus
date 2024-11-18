import { useState, useEffect } from "react";
import axios from "axios";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";

// initializing firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    // check for auth changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // user logged in
      } else {
        setUser(null); // no log in
      }
      setLoading(false); // auth done, not loading anymore
    });

    return unsubscribe;
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Sign-in process started");
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in as: ", userCred.user.email);
      setLoginMessage("log in success!");
    } catch (error) {
      console.error("Sign-in error (handleSignIn):", error.message);
      setLoginMessage(`error: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out");
      setLoginMessage("");
    } catch (error) {
      console.error("Sign-out error: ", error.message);
    }
  };

  const fetchData = async () => {
    if (user) {
      try {
        const token = await user.getIdToken();

        const resp = await axios.get("https://localhost:8000/protected-api", {
          headers: {
            Authorization: "Bearer ${token}",
          },
        });
        setData(resp.data);
      } catch (error) {
        console.error("error getting data", error.message);
      }
    }
  };

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api");
      setArray(response.data.fruits);
      console.log(response.data.fruits);
    } catch (error) {
      console.error(
        "Error fetching data from backend:",
        error.response || error.message || error
      );
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      {/* display login if no one logged in*/}
      {!user ? (
        <>
          <form onSubmit={handleSignIn}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </>
      ) : (
        <>
          <p> Hello, {user.email}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}

      {/*display login success or error*/}
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
}

export default App;
