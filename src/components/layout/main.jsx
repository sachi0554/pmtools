import React, {Component } from 'react';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Navigation from './nav';
import Dashboard from '../../pages/dashboard/Dashboard';
import AddProject from '../../pages/project/AddProject';



import '../../assets/css/style.css'
 
 
 
class MainLayout extends Component {
   
    render() {
      return (
        <Router>
          <div>
            <Navigation>

            </Navigation>

            <div id="main">
              <div className="container-fluid">
                <Switch>
                  <Route exact path="/add">
                    <AddProject />
                  </Route>
                  <Route path="/">
                    <Dashboard />
                  </Route>
                </Switch>
              </div>

            </div>
          </div>
        </Router>
           
      );
    }
  }


  export default MainLayout;