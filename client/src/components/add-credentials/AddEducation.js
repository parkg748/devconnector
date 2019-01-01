import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddEducation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { errors } = this.state;

    return (
      <div></div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddEducation));
