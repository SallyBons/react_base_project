import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import InputField from './InputField';
import {
  required, minLengthOverview, matchesPassword, email
} from './validation';
import {addNewUser, validateUserEmailRegistraion} from '../auth';

import {loadUser} from '../reducer/user';

import './styles.css';

class RegistrationForm extends PureComponent {
    static propTypes = {
      handleSubmit: PropTypes.func.isRequired,
      pristine: PropTypes.bool.isRequired,
      submitting: PropTypes.bool.isRequired,
      reset: PropTypes.func.isRequired,
      invalid: PropTypes.bool.isRequired,
    }

    render() {
      const {
        handleSubmit, pristine, submitting, reset, invalid
      } = this.props;
      return (

        <div className="form registration">

          <h1 className="form__headline">Welcome, New User</h1>

          <form onSubmit={handleSubmit}>

            <div className="form__input name">
              <Field
                name="name"
                label="Name"
                type="text"
                component={InputField}
                validate={[required, minLengthOverview]}
              />
            </div>

            <div className="form__input surname">
              <Field
                name="surname"
                label="Surname"
                type="text"
                component={InputField}
                validate={[required, minLengthOverview]}
              />
            </div>

            <div className="form__input password">
              <Field
                name="password"
                label="Password"
                type="text"
                component={InputField}
                validate={[required, minLengthOverview]}
              />
            </div>

            <div className="form__input password">
              <Field
                name="confirmPassword"
                label="Confirm Password"
                type="text"
                component={InputField}
                validate={[required, matchesPassword]}
              />
            </div>

            <div className="form__input email">
              <Field
                name="email"
                label="E-mail"
                type="text"
                component={InputField}
                validate={[required, email, validateUserEmailRegistraion]}
              />
            </div>

            <div className="form__button--wrapper">
              <button type="button" className="form__button clear" onClick={reset} disabled={pristine || submitting}>Clear data</button>
              <button type="submit" className="form__button send" disabled={invalid}>Confirm registration</button>
            </div>

          </form>
        </div>
      );
    }
}


const selector = formValueSelector('RegistrationForm');

const mapStateToProps = state => ({
  name: selector(state, 'name', 'surname'),
  formData: getFormValues('RegistrationForm')(state)
});

export default compose(
  connect(null, {mapStateToProps, loadUser}),
  reduxForm({
    form: 'RegistrationForm',
    enableReinitialize: true,
    onSubmit: (values, props, state) => {
      const user = addNewUser(values.name, values.surname, values.password, values.email);
      state.loadUser(user);
    }
  })
)(RegistrationForm);
