import React from "react";
import Logo1 from "../../images/logo1.png";


export default function Homenavbar() {
  return (
    <div className="navbar bg-base-100 fixed top-0 z-10
">
      <div className="flex-2">
        <img className="w-16" src={Logo1} draggable="false" />


        <h1 className="text-amber-500 font-bold italic text-2xl tracking-wide"> prospectus</h1>
      </div>


    </div>


  );
}
