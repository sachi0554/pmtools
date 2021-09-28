import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    FormBuilder,
    AbstractControl,
    Validators,
    ValidationErrors,
    FormGroup,
    ValidatorFn,
    FieldGroup,
    FieldControl,
} from "react-reactive-form";
import { getProjectDetails, createTeam, createMember, createCycle } from '../../core/service/projectservice';
import TextInput from '../../components/inputComponent/TextInput';
import SelectBox from '../../components/inputComponent/SelectBox';
import DatePicker from "react-datepicker";
import TextArea from '../../components/inputComponent/TextArea';
import "react-datepicker/dist/react-datepicker.css";

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import project_mg from '../../assets/images/project.jpg'
import LineChart from '../../components/charts/LineChart ';
import BarChart from '../../components/charts/Barchart';
import PieChart from '../../components/charts/PieChart';

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectDetails: [],
            isOpen: false,
            title: '',
            description: '',
            projectId: null,
            isUserModelOpen: false,
            team_id: '',
            isCycleOpen: false,
            data: [],
            label: [],
            isLineChart: false,
            isBarChart:false,
            isPieChart:false
        }

        this.formatDate = this.formatDate.bind(this)

    }

    memberForm = FormBuilder.group(
        {
            full_name: ["", Validators.required],
            dev_title: ["", Validators.required],
            job_description: ["this is dev", Validators.required],
            work_type: ["", Validators.required],
            work_hours: ["", Validators.required],
            team: '',
            start_date: new Date(),
            end_date: new Date(),
        },
    );

    teamForm = FormBuilder.group(
        {
            team_title: ["", Validators.required],
            project: ["", Validators.required],
            team_description: ["", Validators.required],
        },
    );

    cycleForm = FormBuilder.group(
        {
            title: ["", Validators.required],
            project: ["", Validators.required],
            total_story_committed: ["", Validators.required],
            total_story_completed: ["", Validators.required],
            no_resource: ["", Validators.required],
            availabe_resource_hrs: '',
            total_efforts: "",
            total_efforts_used: "",
            total_storypoints: "",
            total_storypoints_achieved: "",
            total_bugs_report_qa: "",
            total_bugs_report_valid_qa: "",
            total_bugs_report_prod: "",
            total_bugs_report_valid_prod: "",
            total_bugs_resolved_qa: "",
            total_bugs_resolved_prod: "",
            comments: ""

        },
    );

    componentDidMount() {
        let { id } = this.props.match.params
        this.setState({ projectId: id });
        this.projectList();

    }

    projectList = () => {
        let { id } = this.props.match.params
        getProjectDetails(id).then(res => {
            this.setState({ projectDetails: res });
            // this.setState({ data :res.projectcycle.map(item => item.total_story_completed)})
            // this.setState({ label :res.projectcycle.map(item => item.total_story_committed)})
        })
    }
    handelModel = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handelUserModel = (team_id) => {

        this.memberForm.controls['team'].setValue(team_id);
        this.setState({ isUserModelOpen: !this.state.isUserModelOpen });

    }
    handelCycleModel = () => {

        this.setState({ isCycleOpen: !this.state.isCycleOpen });

    }


    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    handleStartDateChange = (date) => {
        this.memberForm.controls['start_date'].setValue(date);
    }
    handleEndDateChange = (date) => {
        this.memberForm.controls['end_date'].setValue(date);
    }

    onTeamCreate = (e) => {
        e.preventDefault();
        let team = this.teamForm.value;
        team.project = [this.state.projectId]
        console.log(team);
        createTeam(team).then(res => {
            this.setState({ isOpen: false })
            this.projectList();
        })
    }

    onMemberCreate = (e) => {
        e.preventDefault();
        let member = this.memberForm.value;
        member.start_date = this.formatDate(member.start_date)
        member.end_date = this.formatDate(member.end_date)
        createMember(member).then(res => {
            this.setState({ isUserModelOpen: false })
            this.projectList();
        })
    }

    onCycleCreate = (e) => {
        e.preventDefault();
        let { projectId } = this.state;
        let cycle = this.cycleForm.value;
        cycle.project = [projectId]
        createCycle(cycle).then(res => {
            this.setState({ isCycleOpen: false })
            this.projectList();
        })
    }

    onBarChartOpen = () => {
        const {projectcycle} = this.state.projectDetails
        this.setState({ isLineChart: !this.state.isLineChart });
        this.setState({ data : projectcycle.map(item => item.total_story_completed)})
        this.setState({ label :projectcycle.map(item => item.total_story_committed+" Story")})
     
    }
    isLineChartClose=()=>{
        this.setState({ isLineChart: !this.state.isLineChart });
    }
    isBarChart=()=>{
        const {projectcycle} = this.state.projectDetails
        this.setState({ isBarChart: !this.state.isBarChart });
        this.setState({ data :projectcycle.map(item => item.total_efforts_used)})
        this.setState({ label :projectcycle.map(item => item.total_efforts+" hours")})
    }

    isPieChart=()=>{
        const {projectcycle} = this.state.projectDetails
        this.setState({ isPieChart: !this.state.isPieChart });
        this.setState({ data :projectcycle.map(item => item.total_bugs_report_valid_qa)})
        this.setState({ label :projectcycle.map(item => item.total_bugs_report_qa+" Bugs find valid bug")})
    }



    render() {
        const { data, label } = this.state
        let project = this.state.projectDetails;

        let teams = project.team !== undefined ?
            project.team.map((item) =>
                <ul className="about" key={item.id}>
                    <li className="about-items"><i className="mdi mdi-account icon-sm "></i><span className="about-item-name">Team Name:</span><span className="about-item-detail">{item.team_title}</span></li>
                    <li className="about-items"><i className="mdi mdi-format-align-left icon-sm "></i><span className="about-item-name">Description:</span><span className="about-item-detail">{item.team_description}</span></li>

                    <li className="about-items"><i className="mdi mdi-trophy-variant-outline icon-sm "></i><span className="about-item-name">Team Member:</span><span className="about-item-detail">
                        {item.member.map((member) =>
                            <button type="button" key={member.id} title={member.full_name} className="btn btn-success btn-rounded btn-icon">
                                <i className="mdi mdi-star text-white"></i>{member.full_name.charAt(0)}
                            </button>
                        )}
                        <i onClick={() => this.handelUserModel(item.id)} className="bi bi-person-plus pull-right btn-icon-size"></i>
                    </span> <a href="" className="about-item-edit">View</a></li>

                </ul>
            ) : null;

        let cycle = project.projectcycle !== undefined ?
            project.projectcycle.map((item) =>
                <div key={item.id} className="card">

                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="stat-1" role="tabpanel" aria-labelledby="stat-1-tab">
                                <strong>{item.title}</strong>
                                <hr />
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <span><strong style={{ fontSize: "2em" }} className="card-title">{item.total_story_committed}/{item.total_story_completed}</strong></span>
                                                <small className="card-text">Story Completed </small>
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-link btn-sm">Burndown Chart</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <span><strong style={{ fontSize: "2em" }} className="card-title">{item.total_efforts}/{item.total_efforts_used}</strong></span>
                                                <small className="card-text">Efforts Hours Used</small>
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-link btn-sm">Test report</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <span><strong style={{ fontSize: "2em" }} className="card-title">{item.total_bugs_report_valid_qa + item.total_bugs_report_valid_prod}/{item.total_bugs_resolved_qa + item.total_bugs_resolved_prod}</strong></span>
                                                <small className="card-text">Bugs </small>
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-link btn-sm">Test resport</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="spacer"></div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Completion Percentage :</label>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: (item.total_story_completed * 100 / item.total_story_committed) + "%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">{(item.total_story_completed * 100 / item.total_story_committed).toFixed(0)}%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="spacer"></div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Man-Power used percentage : <span className="badge badge-pill badge-warning">+ 5%</span></label>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: (item.total_efforts_used * 100 / item.total_efforts) + "%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">{item.total_efforts_used * 100 / item.total_efforts}</div>
                                            <div className="progress-bar bg-warning" role="progressbar" style={{ width: (100 - item.total_efforts_used * 100 / item.total_efforts) + "%" }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="100">{100 - item.total_efforts_used * 100 / item.total_efforts}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="task-1" role="tabpanel" aria-labelledby="task-1-tab">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Desc</th>
                                            <th scope="col">State</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Conception</td>
                                            <td>Make studies on UX design, technology needs and budget.</td>
                                            <td><span className="badge badge-pill badge-success">Ended</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to task info</button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Piece developement</td>
                                            <td>Construct motor, wheels, lights ...</td>
                                            <td><span className="badge badge-pill badge-success">Ended</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to task info</button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Assembly</td>
                                            <td>Make the bicycle with pieces.</td>
                                            <td><span className="badge badge-pill badge-warning">Work in progress</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to task info</button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Tests</td>
                                            <td>Verify product with the Testing plan.</td>
                                            <td><span className="badge badge-pill badge-primary">To do</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to task info</button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Sending</td>
                                            <td>Send the bicycle</td>
                                            <td><span className="badge badge-pill badge-primary">To do</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to task info</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="team-1" role="tabpanel" aria-labelledby="team-1-tab">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark Otto</td>
                                            <td><span className="badge badge-pill badge-primary">UX/UI Designer</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to profile</button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jhon Doe</td>
                                            <td><span className="badge badge-pill badge-warning">Engineer</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to profile</button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Thibault Leveau</td>
                                            <td><span className="badge badge-pill badge-warning">Engineer</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to profile</button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Jean Zobbix</td>
                                            <td><span className="badge badge-pill badge-primary">UX/UI Designer</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to profile</button></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>Thibeauf Dupont</td>
                                            <td><span className="badge badge-pill badge-danger">Project Manager</span></td>
                                            <td><button className="btn btn-link btn-sm">Go to profile</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            ) : null;


        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="profile-card">

                                <div className="profile-header">

                                    <div className="cover-image">
                                        <img src={project_mg} className="img img-fluid" />
                                    </div>
                                    <div className="user-image">
                                        <span className="logo-text-round">{project.title?.charAt(0)}</span>
                                    </div>
                                </div>

                                <div className="profile-content">
                                    <div className="profile-name">{project.title}</div>
                                    <div className="profile-designation">Webdeveloper</div>
                                    <p className="profile-description">{project.description}</p>
                                    <ul className="profile-info-list">
                                        <a onClick={this.onBarChartOpen} className="profile-info-list-item"><i className="mdi mdi-eye"></i>Story Charts</a>
                                        <a onClick={this.isBarChart} className="profile-info-list-item"><i className="mdi mdi-bookmark-check"></i>Efforts Used Chart</a>
                                        <a onClick={this.isPieChart} className="profile-info-list-item"><i className="mdi mdi-movie"></i>Bugs Report Chart</a>
                                        <a href="" className="profile-info-list-item"><i className="mdi mdi-account"></i>Statics</a>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title font-weight-bold">Project Details</p>
                                <hr />
                                <div className="card-description">
                                    <span>Teams </span>
                                    <i onClick={this.handelModel} className="bi bi-plus-circle-fill pull-right btn-icon-size"></i>


                                </div>
                                {teams}
                                <div className="card-description">
                                    <span>Cycle Details </span>
                                    <i onClick={this.handelCycleModel} className="bi bi-plus-circle-fill pull-right btn-icon-size"></i>


                                </div>
                                {cycle}

                            </div>
                        </div>
                    </div>


                </div>



                <Modal open={this.state.isOpen} classNames="bg-secondary shadow" onClose={this.handelModel} center>
                    <div>
                        <FieldGroup control={this.teamForm} render={() => (
                            <form className="form-team" onSubmit={this.onTeamCreate}>
                                <div>
                                    <h6 className="heading-small text-muted mb-4">Create Team</h6>
                                </div>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group focused">
                                                <FieldControl
                                                    name="team_title"
                                                    render={TextInput}
                                                    meta={{
                                                        label: "Team Title",
                                                        placeholder: "Enter team title"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="pl-lg-4">
                                    <div className="form-group focused">
                                        <FieldControl
                                            name="team_description"
                                            render={TextArea}
                                            meta={{
                                                label: "About Team",
                                                placeholder: "description"
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="pl-lg-4 mt-3">
                                    <button onClick={this.handelModel} type="button" className="btn btn-danger">Cancel</button>  <button type="submit" className="btn btn-success">Create</button>
                                </div>
                            </form>
                        )} />
                    </div>
                </Modal>

                <Modal open={this.state.isUserModelOpen} classNames="bg-secondary shadow" onClose={this.handelUserModel} center>

                    <FieldGroup control={this.memberForm} render={({ pristine, value }) => (
                        <form className="form-team" onSubmit={this.onMemberCreate}>
                            <div className="pl-lg-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="full_name"
                                                render={TextInput}
                                                meta={{
                                                    label: "First Name",
                                                    placeholder: "Enter first name"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="dev_title"
                                                render={SelectBox}
                                                meta={{
                                                    label: "Job Title",
                                                    placeholder: "Enter first name",
                                                    values: ["Front Developer", 'Back End Developer']
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="work_type"
                                                render={SelectBox}
                                                meta={{
                                                    label: "Job Type",
                                                    placeholder: "Enter first name",
                                                    values: ["Full Time", 'Part Time']
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="work_hours"
                                                render={SelectBox}
                                                meta={{
                                                    label: "Working Hours",
                                                    placeholder: "Enter first name",
                                                    values: ["8 Hours", '10 Hours', '4 Hours']
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group focused">
                                            <label className="form-control-label">Start Date:</label>
                                            <DatePicker className="form-control"
                                                selected={this.memberForm.controls['start_date'].value}
                                                dateFormat="dd-MM-yyyy"

                                                // onSelect={handleDateSelect} //when day is clicked
                                                onChange={this.handleStartDateChange} //only when value has changed
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group focused">
                                            <label className="form-control-label">End Date:</label>
                                            <DatePicker className="form-control"
                                                selected={this.memberForm.controls['end_date'].value}
                                                // onSelect={handleDateSelect} //when day is clicked
                                                dateFormat="dd-MM-yyyy"
                                                onChange={this.handleEndDateChange} //only when value has changed
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div>
                                <div className="pl-lg-4 mt-3">
                                    <button onClick={this.handelUserModel} type="button" className="btn btn-danger">Cancel</button>  <button type="submit" className="btn btn-success">Create</button>
                                </div>
                            </div>
                        </form>
                    )}

                    />

                </Modal>
                <Modal open={this.state.isCycleOpen} className="bg-secondary shadow" onClose={this.handelCycleModel} center>

                    <FieldGroup control={this.cycleForm} render={({ pristine, value }) => (
                        <form className="form-team" onSubmit={this.onCycleCreate}>
                            <div className="pl-lg-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="title"
                                                render={TextInput}
                                                meta={{
                                                    label: "cycle name",
                                                    placeholder: "Enter cycle name"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="no_resource"
                                                render={TextInput}
                                                meta={{
                                                    label: "No of resource",
                                                    placeholder: "Enter first name",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="availabe_resource_hrs"
                                                render={TextInput}
                                                meta={{
                                                    label: "Available Resource Hours",
                                                    placeholder: "Enter first name",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_story_committed"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total Story Committed",
                                                    placeholder: "No of Story Committed",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_story_completed"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total Story Completed",
                                                    placeholder: "No of Story Completed",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_efforts"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total efforts in Hours",
                                                    placeholder: "enter hours",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_efforts_used"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total efforts used in Hours ",
                                                    placeholder: "enter hours",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_storypoints"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total StoryPoint",
                                                    placeholder: "enter no.",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_storypoints_achieved"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total Story Point achieved",
                                                    placeholder: "enter no.",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_bugs_report_qa"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total bugs reported in QA",
                                                    placeholder: "enter no.",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_bugs_report_valid_qa"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total bugs valid in QA",
                                                    placeholder: "enter no.",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_bugs_report_prod"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total bugs reported in Prod",
                                                    placeholder: "enter no.",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_bugs_report_valid_prod"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total bugs valid in Prod",
                                                    placeholder: "enter no.",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_bugs_resolved_qa"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total bugs resolved in Prod",
                                                    placeholder: "enter no.",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group focused">
                                            <FieldControl
                                                name="total_bugs_resolved_prod"
                                                render={TextInput}
                                                meta={{
                                                    label: "Total bugs resolved in Prod",
                                                    placeholder: "enter no.",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group focused">
                                                <FieldControl
                                                    name="comments"
                                                    render={TextArea}
                                                    meta={{
                                                        label: "Comments",
                                                        placeholder: "enter no.",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div>
                                <div className="pl-lg-4 mt-3">
                                    <button onClick={this.handelCycleModel} type="button" className="btn btn-danger">Cancel</button>  <button type="submit" className="btn btn-success">Create</button>
                                </div>
                            </div>
                        </form>
                    )}

                    />

                </Modal>

                <Modal open={this.state.isLineChart} classNames="bg-secondary shadow" onClose={this.isLineChartClose} center>
                    <div style={{width:"650px"}}>
                        <LineChart  chartData={data} chartLabel={label} ></LineChart>
                    </div>
                </Modal>
                <Modal open={this.state.isBarChart} classNames="bg-secondary shadow" onClose={this.isBarChart} center>
                    <div style={{width:"650px"}}>
                        <BarChart  chartData={data} chartLabel={label} ></BarChart>
                    </div>
                </Modal>
                <Modal open={this.state.isPieChart} classNames="bg-secondary shadow" onClose={this.isPieChart} center>
                    <div style={{width:"650px"}}>
                        <PieChart  chartData={data} chartLabel={label} ></PieChart>
                    </div>
                </Modal>
                

            </div>

        );
    }
}
export default Details;
