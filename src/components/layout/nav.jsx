import React, {Component } from 'react';
import {Link} from "react-router-dom";
import '../../assets/css/style.css'
 
 
 
class Navigation extends Component {
      constructor(props){
        super(props)
      }
    
   
    render() {
      const { show } = this.props;
      return (
        <div>
          <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-dark">
          <button className="openbtn" onClick={this.props.navClick}>☰</button>  
          <Link to="/" className="navbar-brand">Dashboard</Link>
          <div className="logout">
          <a className="logout-link">Logout</a>
          </div>
          </nav>
          
        <div id="mySidebar" className={`${show ? "sidebar" : "nodisplay"}`}>
            <a className="closebtn" onClick={this.props.navClick}>×</a>
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