import React, {Component } from 'react';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Navigation from './nav';
import Dashboard from '../../pages/dashboard/Dashboard';
import AddProject from '../../pages/project/Create';
import Details from '../../pages/project/Details';



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
                  <Route exact path="/project/add" component={AddProject}/>
                  <Route path="/project/:id" component={Details}/>
                  <Route path="/" component={Dashboard} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
           
      );
    }
  }


  export default MainLayout;