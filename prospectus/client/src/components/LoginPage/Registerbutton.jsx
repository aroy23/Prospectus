import React from "react"
import { Link } from "react-router-dom"


function Registerbutton() {
    return (
        <div className="mt-3 flex">
            <p> Don't have account? </p>

            <Link to="/register" className="ml-2 underline"> Sign up.</Link>
        </div>)   
}


export default Registerbutton