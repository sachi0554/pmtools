
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


class Header extends Component {
   
    render() {
      return (
           <div>
               
              <nav className="navbar navbar-light bg-light">
                   <div className="container-fluid">
                      <a className="navbar-brand" href="#"> <img src="../../assets/logo.svg" alt="" width="30" height="24" className="d-inline-block align-text-top"/> PM Tools</a>
                    </div>
              </nav>
           </div>
      );
    }
  }
  
  export default Header;
  