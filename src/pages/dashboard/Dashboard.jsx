import React, { Component } from 'react';

import  {getProject}  from '../../core/service/projectservice';

import '../../assets/css/style.css'
 

class Dashboard extends Component {
  constructor(props){
    super(props)
    
    this.state = {projects:[]};
    this.getDay = this.getDay.bind();
    this.getmonth = this.getmonth.bind();
  }
  componentDidMount(){
    getProject().then(res=>{
      this.setState({projects: res})
    });
  }
   
  getDay=(value) => {
    return value.split("-")[2]
  }
  getmonth=(value) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const date = new Date(value)
    console.log(date.getMonth())
    return monthNames[date.getMonth()];
    //return month
  }
  
  render() {
    const projects = this.state.projects? this.state.projects : [];
    const listItems =  projects.map((item) =>
    <div key={item.id} className="col-lg-4">
    <div className="card card-margin">
      <div className="card-header no-border">
        <h5 className="card-title">{item.title}</h5>
      </div>
      <div className="card-body pt-0">
        <div className="widget-49">
          <div className="widget-49-title-wrapper">
            <div className="widget-49-date-primary">
              <span className="widget-49-date-day">{this.getDay(item.release_date)}</span>
              <span className="widget-49-date-month">{this.getmonth(item.release_date)}</span>
            </div>
            <div className="widget-49-meeting-info">
              <span className="widget-49-pro-title">PRO-08235 DeskOpe. Website</span>
              <span className="widget-49-meeting-time">from: {item.start_date} to: {item.end_date}</span>
            </div>
          </div>
          <ul className="widget-49-meeting-points">
          <i class="bi bi-tools"></i><span className="">{item.methodology}</span> 
            <li className="widget-49-meeting-item"><span>Data migration is in scope</span></li>
            <li className="widget-49-meeting-item"><span>Session timeout increase to 30 minutes</span></li>
          </ul>
          <div className="widget-49-meeting-action">
            <a href="#" className="btn btn-sm btn-flash-border-primary">View All</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
   
    return (
      <div className="container">
        <div className="row">
          {listItems}
        </div>
      </div>

    );
  }
}

export default Dashboard;
