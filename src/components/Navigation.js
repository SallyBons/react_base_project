import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {NavLink, Redirect} from 'react-router-dom';
import './styles.css';
import {connect} from 'react-redux';
import {isEmpty} from '../utils';
import {selectUser} from '../reducer/user';

class Navigation extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,

  }

  render() {
    const {user} = this.props;
    const isLogin = user;

    const CheckLogin = () => {
      let adminName = '';
      if (isLogin.isAdmin) {
        adminName = 'Administrator';
      } else {
        adminName = isLogin.name;
      }

      if (!isEmpty(isLogin)) {
        return (
          <React.Fragment>
            <Redirect to="/" />
            <p className="navigation__username">Hello, {adminName}</p>
            <NavLink to="/logout" className="nav-item logout" activeClassName="active-nav-item">Log Out</NavLink>
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          <NavLink to="/login" className="nav-item login" activeClassName="active-nav-item">Sign In / Sign Up</NavLink>
        </React.Fragment>
      );
    };

    return (
      <div>
        <nav className="navigation">
          <div className="navigation__homepage">
            <NavLink to="/" className="nav-item" activeClassName="active-nav-item" exact>homepage</NavLink>
          </div>
          <div className="navigation__buttons">
            {CheckLogin()}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

export default connect(mapStateToProps)(Navigation);
