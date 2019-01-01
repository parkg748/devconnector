import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

      // Set component fields state
      this.setState({ handle: profile.handle,
                      company: profile.company,
                      website: profile.website,
                      location: profile.location,
                      githubusername: profile.githubusername,
                      bio: profile.bio,
                      twitter: profile.twitter,
                      facebook: profile.facebook,
                      linkedin: profile.linkedin,
                      youtube: profile.youtube,
                      instagram: profile.instagram,
                      skills: skillsCSV });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    }
    
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup value={this.state.twitter} error={errors.twitter} icon="fab fa-twitter" onChange={this.onChange} placeholder="Twitter Profile URL" name="twitter" />
          <InputGroup value={this.state.facebook} error={errors.facebook} icon="fab fa-facebook" onChange={this.onChange} placeholder="Facebook Page URL" name="facebook" />
          <InputGroup value={this.state.linkedin} error={errors.linkedin} icon="fab fa-linkedin" onChange={this.onChange} placeholder="Linkedin Profile URL" name="linkedin" />
          <InputGroup value={this.state.youtube} error={errors.youtube} icon="fab fa-youtube" onChange={this.onChange} placeholder="YouTube Channel URL" name="youtube" />
          <InputGroup value={this.state.instagram} error={errors.instagram} icon="fab fa-instagram" onChange={this.onChange} placeholder="Instagram Page URL" name="instagram" />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: '0' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup value={this.state.handle} error={errors.handle} onChange={this.onChange} placeholder="* Profile handle" name="handle" info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)" />
                <SelectListGroup value={this.state.status} error={errors.status} onChange={this.onChange} name="status" options={options} info='Give us an idea of where you are at in your career'/>
                <TextFieldGroup value={this.state.company} error={errors.company} onChange={this.onChange} placeholder="Company" name="company" info='Could be your own company or one you work for' />
                <TextFieldGroup value={this.state.website} error={errors.website} onChange={this.onChange} placeholder="Website" name="website" info='Could be your own or a company website' />
                <TextFieldGroup value={this.state.location} error={errors.location} onChange={this.onChange} placeholder="Location" name="location" info='City & state suggested (eg. Boston, MA)' />
                <TextFieldGroup value={this.state.skills} error={errors.skills} onChange={this.onChange} placeholder="Skills" name="skills" info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)' />
                <TextFieldGroup value={this.state.githubusername} error={errors.githubusername} onChange={this.onChange} placeholder="Github Username" name="githubusername" info='If you want your latest repos and a Github link, include your username' />
                <TextareaFieldGroup value={this.state.bio} error={errors.bio} onChange={this.onChange} placeholder="A short bio of yourself" name="bio" info='Tell us a little about yourself'/>

                <div className="mb-3">
                  <button type='button' onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))
                  }} type="button" className="btn btn-light">Add Social Network Links</button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
