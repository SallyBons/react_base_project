import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Field, reduxForm, formValueSelector, getFormValues
} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';
import InputField from './InputField';
import {authentificateUser, validateUserEmail, validateUserPassword} from '../auth';
import {
  required, email
} from './validation';

import {loadUser} from '../reducer/user';


class LogIn extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
  }

  render() {
    const {handleSubmit, invalid} = this.props;

    return (
      <div className="form login">

        <h1 className="form__headline">Sing in, Stranger</h1>

        <form onSubmit={handleSubmit}>

          <div className="form__input email">
            <Field
              name="email"
              label="E-mail"
              type="text"
              component={InputField}
              validate={[email, validateUserEmail, required]}
            />
          </div>

          <div className="form__input password">
            <Field
              name="password"
              label="Password"
              type="text"
              component={InputField}
              validate={[required, validateUserPassword]}
            />
          </div>

          <div className="form__button--wrapper">

            <React.Fragment>
              <NavLink to="/reg" className="nav-item registration" activeClassName="active-nav-item">Registration</NavLink>
            </React.Fragment>
            <button type="submit" className="form__button send" disabled={invalid}>Login</button>
          </div>

        </form>
      </div>
    );
  }
}

const selector = formValueSelector('LogInForm');

const mapStateToProps = state => ({
  name: selector(state, 'email', 'password'),
  formData: getFormValues('LogInForm')(state)
});

export default compose(
  connect(null, {mapStateToProps, loadUser}),
  reduxForm({
    form: 'LogInForm',
    enableReinitialize: true,
    onSubmit: (values, props, state) => {
      const user = authentificateUser(values.email, values.password);
      state.loadUser(user);
    }
  })
)(LogIn);
