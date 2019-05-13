
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectUser, loadUser} from '../reducer/user';

class LogOut extends Component {
    static propTypes = {
      loadUser: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
    }

    componentDidMount() {
      const {loadUser} = this.props;
      loadUser({});
    }

    render() {
      const {history} = this.props;
      history.goBack();
      return (
        <div />
      );
    }
}

const mapStateToProps = state => ({
  user: selectUser(state)
});

export default connect(null, {mapStateToProps, loadUser})(withRouter(LogOut));
