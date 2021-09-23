import React, { Component } from 'react';
import {
  FormBuilder,
  Validators,
  FieldControl,
  FieldGroup
} from "react-reactive-form";
import TextInput from '../../components/inputComponent/TextInput';
import SelectBox from '../../components/inputComponent/SelectBox';
import DatePicker from "react-datepicker";
import TextArea from '../../components/inputComponent/TextArea';



class AddProject extends Component {

  projectForm = FormBuilder.group(
    {
      title: ["", Validators.required],
      methodology: ["", Validators.required],
      release_no: ["0.0.0", Validators.required],
      release_date: new Date(),
      planned_task: ["", Validators.required],
      start_date: new Date(),
      end_date: new Date(),
      description: ""
    });


  onProjectCreate = (e) => {
    e.preventDefault();
    console.log(this.projectForm.value);
  }

  handleStartDateChange = (date) => {
    this.projectForm.controls['start_date'].setValue(date);
  }
  handleEndDateChange = (date) => {
    this.projectForm.controls['end_date'].setValue(date);
  }
  handleReleaseDateChange = (date) => {
    this.projectForm.controls['release_date'].setValue(date);
  }
  render() {
    return (
      <div className="container">
        <div className="project-container">
          <div className="col-md-6 grid-margin stretch-card c-center">
            <div className="card">
              <div className="card-body">
                <p className="card-title font-weight-bold">Create Project</p>
                <hr />
                <FieldGroup control={this.projectForm} render={() => (
                  <form onSubmit={this.onProjectCreate}>
                    <div className="col-md-12">
                      <FieldControl
                        name="title"
                        render={TextInput}
                        meta={{
                          label: "Project Title",
                          placeholder: "Enter Project Title"
                        }}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-2">
                        <FieldControl
                          name="methodology"
                          render={SelectBox}
                          meta={{
                            label: "Working Hours",
                            placeholder: "Enter first name",
                            values: ["Agile", "Scrum", "WaterFall"]
                          }}
                        />

                      </div>
                      <div className="col-md-6 mt-2">
                        <FieldControl
                          name="release_no"
                          render={TextInput}
                          meta={{
                            label: "Release No.",
                            placeholder: "Enter Release No."
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-2">
                        <label className="form-control-label">Release Date:</label>
                        <DatePicker className="form-control"
                          selected={this.projectForm.controls['release_date'].value}
                          dateFormat="yyyy-mm-dd"
                          onChange={this.handleReleaseDateChange} //only when value has changed
                        />
                      </div>
                      <div className="col-md-6 mt-2">
                        <FieldControl
                          name="planned_task"
                          render={TextInput}
                          meta={{
                            label: "Planed Task",
                            placeholder: "Enter Planed Task"
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-2">
                        <label className="form-control-label">Start Date:</label>
                        <DatePicker className="form-control"
                          selected={this.projectForm.controls['start_date'].value}
                          dateFormat="dd-MM-yyyy"

                          // onSelect={handleDateSelect} //when day is clicked
                          onChange={this.handleStartDateChange} //only when value has changed
                        />
                      </div>
                      <div className="col-md-6 mt-2">
                        <label className="form-control-label">End Date:</label>
                        <DatePicker className="form-control"
                          selected={this.projectForm.controls['end_date'].value}
                          dateFormat="dd-MM-yyyy"

                          // onSelect={handleDateSelect} //when day is clicked
                          onChange={this.handleEndDateChange} //only when value has changed
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mt-2">
                      <FieldControl
                        name="description"
                        render={TextArea}
                        meta={{
                          label: "Project Description",
                          placeholder: "Project Description"
                        }}
                      />
                    </div>

                    <div className="col-md-12 mt-4">
                      <button onClick={this.handelCycleModel} type="button" className="btn btn-danger">Cancel</button>  <button type="submit" className="btn btn-success">Create</button>
                    </div>
                  </form>
                )} />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default AddProject;
