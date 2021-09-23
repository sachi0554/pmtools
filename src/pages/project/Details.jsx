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


class Details extends Component {
    constructor(props) {
        super(props)
        this.state = { projectDetails: [], isOpen: false, title: '', description: '', projectId: null, isUserModelOpen: false, team_id: '', isCycleOpen: false }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formatDate = this.formatDate.bind(this)
        // this.handelUserModel = this.handelUserModel.bind(this)

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

    handleChange(event) {
        const target = event.target;
        const value = target.value
        const name = target.name;
        this.setState({
            [name]: value
        });

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

    onSubmit = (e) => {

        let team = { name: this.state.title, team_description: this.state.description, project: [this.state.projectId] }
        createTeam(team).then(res => {
            this.setState({ isOpen: false })
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

    onCycleCreate=(e)=>{
        e.preventDefault();
        let {projectId}= this.state;
        let cycle = this.cycleForm.value;
        cycle.project =  [projectId]
        createCycle(cycle).then(res => {
            this.setState({ isCycleOpen: false })
            this.projectList();
        })
    }
    render() {

        let project = this.state.projectDetails;
        let { title, description } = this.state;


        let teams = project.team !== undefined ?
            project.team.map((item) =>
                <ul className="about" key={item.id}>
                    <li className="about-items"><i className="mdi mdi-account icon-sm "></i><span className="about-item-name">Team Name:</span><span className="about-item-detail">{item.team_title}</span></li>
                    <li className="about-items"><i className="mdi mdi-format-align-left icon-sm "></i><span className="about-item-name">Description:</span><span className="about-item-detail">{item.team_description}</span></li>

                    <li className="about-items"><i className="mdi mdi-trophy-variant-outline icon-sm "></i><span className="about-item-name">Team Member:</span><span className="about-item-detail">
                        {item.member.map((member) =>
                            <button type="button" key={member.id} className="btn btn-success btn-rounded btn-icon">
                                <i className="mdi mdi-star text-white"></i>{member.dev_title.charAt(0)}
                            </button>
                        )}
                        <i onClick={() => this.handelUserModel(item.id)} className="bi bi-person-plus pull-right btn-icon-size"></i>
                    </span> <a href="" className="about-item-edit">View</a></li>

                </ul>
            ) : null;

        let cycle = project.projectcycle !== undefined ?
        project.projectcycle.map((item) =>
            <div className="card">
             
                <div className="card-body">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="stat-1" role="tabpanel" aria-labelledby="stat-1-tab">
                            <strong>{item.title}</strong>
                            <hr/>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <span><strong style={{fontSize: "2em"}} className="card-title">{item.total_story_committed}/{item.total_story_completed}</strong></span>
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
                                            <span><strong style={{fontSize: "2em"}} className="card-title">{item.total_efforts}/{item.total_efforts_used}</strong></span>
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
                                            <span><strong style={{fontSize: "2em"}} className="card-title">{item.total_bugs_report_valid_qa+item.total_bugs_report_valid_prod}/{item.total_bugs_resolved_qa+item.total_bugs_resolved_prod}</strong></span>
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
                                        <div className="progress-bar bg-success" role="progressbar" style={{width: (item.total_story_completed* 100/item.total_story_committed)+"%"  }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">{ (item.total_story_completed* 100/item.total_story_committed).toFixed(0) }%</div>
                                    </div>
                                </div>
                            </div>
                            <div className="spacer"></div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Man-Power used percentage : <span className="badge badge-pill badge-warning">+ 5%</span></label>
                                    <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{width: (item.total_efforts_used* 100/item.total_efforts)+"%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">{item.total_efforts_used* 100/item.total_efforts}</div>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{width: (100 - item.total_efforts_used* 100/item.total_efforts)+"%"}} aria-valuenow="5" aria-valuemin="0" aria-valuemax="100">{100 - item.total_efforts_used* 100/item.total_efforts}</div>
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
                                        <img src="https://cdn.pixabay.com/photo/2019/10/19/14/16/away-4561518_960_720.jpg" className="img img-fluid" />
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
                                        <a href="" className="profile-info-list-item"><i className="mdi mdi-eye"></i>Timeline</a>
                                        <a href="" className="profile-info-list-item"><i className="mdi mdi-bookmark-check"></i>Saved</a>
                                        <a href="" className="profile-info-list-item"><i className="mdi mdi-movie"></i>Medias</a>
                                        <a href="" className="profile-info-list-item"><i className="mdi mdi-account"></i>About</a>

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
                        <form className="form-team">
                            <div>
                                <h6 className="heading-small text-muted mb-4">Create Team</h6>
                            </div>
                            <div className="pl-lg-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group focused">
                                            <label className="form-control-label" for="input-address">Address</label>
                                            <input id="team-title" name="title" className="form-control form-control" value={title} onChange={this.handleChange} placeholder="Team Name" type="text" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="pl-lg-4">
                                <div className="form-group focused">
                                    <label>About Me</label>
                                    <textarea rows="4" id="team_description" name="description" className="form-control form-control-alternative" value={description} onChange={this.handleChange} placeholder="A few words about team........."></textarea>
                                </div>
                            </div>
                            <div className="pl-lg-4 mt-3">
                                <button onClick={this.handelModel} type="button" className="btn btn-danger">Cancel</button>  <button onClick={this.onSubmit} type="button" className="btn btn-success">Create</button>
                            </div>
                        </form>
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

            </div>

        );
    }
}
export default Details;
