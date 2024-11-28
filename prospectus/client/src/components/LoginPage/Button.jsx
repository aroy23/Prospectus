import React from "react";
import { Link } from "react-router-dom";

function Button({ link, text }) {
  return (
    <Link
      to={link}
      className="btn text-white mr-3 bg-yellow-700 hover:bg-yellow-800 rounded-xl px-5 text-center text-base dark:bg-yellow-600 dark:hover:bg-yellow-700"
    >
      {text}
    </Link>
  );
}

export default Button;
