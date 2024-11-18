import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config"; 
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();  

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");  
    setLoading(true); 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user.email);

      navigate("/");

    } catch (error) {
      console.error("Error creating user:", error.message);
      setErrorMessage("Error creating user");  
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSignUp}>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}  // firebase min password length of 6 chars 
          />
        </div>
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Signup;
