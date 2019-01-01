import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onCheck(e) {
    this.setState({ disabled: !this.state.disabled, current: !this.state.current });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='add-experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>Go Back</Link>
              <h1 className='display-4 text-center'>Add Experience</h1>
              <p className='lead text-center'>Add any job or position that you have had in the past or current</p>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup value={this.state.company} error={errors.company} onChange={this.onChange} placeholder="* Company" name="company" />
                <TextFieldGroup value={this.state.title} error={errors.title} onChange={this.onChange} placeholder="* Job Title" name="title" />
                <TextFieldGroup value={this.state.location} error={errors.location} onChange={this.onChange} placeholder="Location" name="location" />
                <h6>From Date</h6>
                <TextFieldGroup value={this.state.from} error={errors.from} onChange={this.onChange} type='date' name="from" />
                <h6>To Date</h6>
                <TextFieldGroup value={this.state.to} error={errors.to} onChange={this.onChange} type='date' name="to" disabled={this.state.disabled ? 'disabled' : ''} />
                <div className='form-check mb-4'>
                  <input type='checkbox' className='form-check-input' name='current' value={this.state.current} checked={this.state.current} onChange={this.onCheck} id='current'/>
                  <label htmlFor='current' className='form-check-label'>Current Job</label>
                </div>
                <TextareaFieldGroup placeholder='Job Description' name='description' value={this.state.description} onChange={this.onChange} error={errors.description} info='Tell us about the position' />
                <input type='submit' value='Submit' className='btn btn-info btn-block mt-4'/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddExperience));
