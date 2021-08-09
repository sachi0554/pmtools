import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Header from './shared/header/head'

 
class App extends Component {
  render() {
    return (
          <Header></Header>
    );
  }
}

export default App;
