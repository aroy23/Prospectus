import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config"; 
import { useNavigate } from "react-router-dom";


function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in as: ", userCred.user.email);
      navigate("/"); 

    } catch (error) {
      console.error("Sign-in error:", error.message);
      setErrorMessage("Sign In Failed. Check your username and Password"); 
    }
  };
  
  return (
    <div>
      <h2>Sign In</h2>
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

      {/* display error if there is any*/}
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p> }

    </div>
  );
}
export default Signin;