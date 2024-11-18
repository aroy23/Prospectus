import { useState, useEffect } from "react";
import axios from "axios";
import { onAuthStateChanged, signOut} from "firebase/auth";
import { auth } from "../firebase-config.js";
import Signin from "./signin.jsx"
import { useNavigate } from "react-router-dom";


function App() {
 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true);
 const [loginMessage, setLoginMessage] = useState("");
 const navigate = useNavigate()



 const handleSignIn = () => { 
    navigate('/signin'); 
 }; 

 const handleSignUp = () => {
  navigate('/signup');
 };


 useEffect(()=> {
   const unsubscribe = onAuthStateChanged(auth,(user) => {
   if (user){
     setUser(user);
   }
   else {
     setUser(null);
   }
   setLoading(false);
 });

 return unsubscribe;
 }, []);

 const handleSignOut = async () => {
   try {
     await signOut(auth);
     console.log("Signed out");
     //setLoginMessage("");
   } catch (error) {
     console.error("Sign-out error: ", error.message);
   }
 };


 if (loading) {
   return <div>Loading...</div>;
 }

 if(!user) {
  return (
   <div>
    <h1>Log In First!</h1>
   <button onClick={handleSignIn}>Go To Sign In</button>
   <h1> or Sign Up!</h1>
   <button onClick={handleSignUp}>Go To Sign Up</button>
   </div> 
  )};



 return (
   <div>
     <h1>Welcome to Prospectus!</h1>
     {!user ? (
       <SignIn setLoginMessage={setLoginMessage} setUser={setUser}/>
     ):(
       <>
       <p>Hello, {user.email}!</p>
       <button onClick={handleSignOut}>Sign Out</button>
       </>
     )}
     {loginMessage /*& <p>{loginMessage}</p>*/}
   </div>
 );
}
export default App;
