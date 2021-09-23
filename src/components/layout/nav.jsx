import React, {Component } from 'react';
import {Link} from "react-router-dom";
import '../../assets/css/style.css'
 
 
 
class Navigation extends Component {
      constructor(props){
        super(props)
        this.state= {isVisible:false}
        this.toggleBox  = this.toggleBox.bind(this);
      }
     
      toggleBox = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ isVisible: !prevState.isVisible }));
      };
       
    
   
    render() {
      const { isVisible } = this.state;
      return (
        <div>
          <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-dark">
          <button className="openbtn" onClick={ this.toggleBox}>☰</button>  
          <Link to="/" className="navbar-brand">Dashboard</Link>
          <div className="logout">
          <a className="logout-link">Logout</a>
          </div>
          </nav>
          
        <div id="mySidebar" className={`${isVisible ? "sidebar" : "nodisplay"}`}>
            <a href="" className="closebtn" onClick={ this.toggleBox}>×</a>
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