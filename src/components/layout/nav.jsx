import React, {Component } from 'react';
import {Link} from "react-router-dom";
import '../../assets/css/style.css'
 
 
 
class Navigation extends Component {
    
      openNav = () => {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      }
      closeNav = () => {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
      }
    
   
    render() {
      return (
        <div>
          <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-dark">
          <button className="openbtn" onClick={this.openNav}>☰</button>  
          <Link to="/" className="navbar-brand">Dashboard</Link>
          <div className="logout">
          <a className="logout-link">Logout</a>
          </div>
          </nav>
          
        <div id="mySidebar" className="sidebar">
            <a href="" className="closebtn" onClick={this.closeNav}>×</a>
            <a href="#"><i className="bi bi-alarm"></i> About</a>
            <Link to="/add"><i className="bi bi-alarm"></i>Add Project</Link>

            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>

      </div>
           
      );
    }
  }


  export default Navigation;