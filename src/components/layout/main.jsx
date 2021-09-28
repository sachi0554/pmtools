import React, {Component } from 'react';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Navigation from './nav';
import Dashboard from '../../pages/dashboard/Dashboard';
import AddProject from '../../pages/project/Create';
import Details from '../../pages/project/Details';



import '../../assets/css/style.css'
 
 
 
class MainLayout extends Component {
     constructor(props){
       super(props)
       this.state= {
        isVisible:false
       }
      //  this.toggleBox  = this.toggleBox.bind(this);
     }

     toggleBox = (e) => {
      this.setState(prevState => ({ isVisible: !prevState.isVisible }));
    };
   
    render() {
      const {isVisible} = this.state
      return (
        <Router>
          <div>
            <Navigation navClick={this.toggleBox.bind(this)} show={isVisible}>

            </Navigation>

            <div id="main" className={`${isVisible ? "main-half" : "main"}`}>
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