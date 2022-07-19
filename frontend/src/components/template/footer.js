import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="row">
      <ul className="col-12 col-sm-4">
       
       <li>
         <Link to="/home">Home</Link>
       </li>
       <li>
       <Link to="/groups">Teams</Link>
       </li>
     </ul>
     <ul className="col-12 col-sm-4">
       <li>
         <Link to="/careers">Careers</Link>
       </li>
       <li>
         <Link to="/events">Events</Link>
       </li>
      
     </ul>
     <ul className="col-12 col-sm-4">
     <li>
         <Link to="/articles">Publications</Link>
       </li>
       <li>
         <Link to="/contact">Contact</Link>
       </li>
      
     </ul>
      </div>
      
    </footer>
  );
};

export default Footer;
