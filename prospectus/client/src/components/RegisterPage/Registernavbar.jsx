import React from "react";
import PrivacyModal from "./Privacy.jsx";

export default function Registernavbar() {
  return (
    <div className="navbar bg-base-100 fixed top-0 z-10
">
      <div className="flex-2">
        <a href="mailto:prospectusucla@gmail.com" className="btn btn-ghost text-xl">Contact Us
        </a>


        <PrivacyModal/>
      </div>


    </div>


  );
}
