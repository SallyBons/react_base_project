import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {Field, reduxForm} from 'redux-form';
import {setSelectorState} from '../reducer/filmSort';

class Filter extends Component {
    SelectField = props => (
      <div>
        <select {...props.input}>
          <option value="None">None</option>
          <option value="ReleaseTopBottom">Release Date - descending</option>
          <option value="ReleaseBottomTop">Release Date - ascending</option>
          <option value="RaitingTopBottom">Raiting - descending</option>
          <option value="RaitingBottomTop">Raiting - ascending</option>
        </select>
      </div>
    );

    render() {
      return (
        <div className="filter-selector">
          <form>
            <h3>Filter movies by: </h3>
            <Field
              name="filter"
              component={this.SelectField}
            />
          </form>
        </div>
      );
    }
}

export default compose(
  connect(null, {setSelectorState}),
  reduxForm({
    form: ' Filter',
    onChange: (values, props, state) => {
      const {setSelectorState} = state;
      setSelectorState(values.filter);
    }
  })
)(Filter);
