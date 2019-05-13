import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm, getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import InputField from './InputField';
import {
  required, minLength, minLengthOverview, maxLength,
} from './validation';
import SelectFieldEdit from './SelectFieldEdit';
import {selectUser} from '../reducer/user';
import {addNewFilm} from '../reducer/films';
import {generateRandomID} from '../utils';

import './styles.css';


class AdminAddPanel extends PureComponent {
    static propTypes = {
      handleSubmit: PropTypes.func.isRequired,
      pristine: PropTypes.bool.isRequired,
      submitting: PropTypes.bool.isRequired,
      reset: PropTypes.func.isRequired,
      invalid: PropTypes.bool.isRequired,
      user: PropTypes.object.isRequired,
    }

    render() {
      const {
        handleSubmit, pristine, submitting, reset, invalid, user
      } = this.props;
      if (user.isAdmin) {
        return (

          <div className="form add-new-movie">

            <h1 className="form__headline">Add new movie</h1>

            <form onSubmit={handleSubmit}>

              <div className="form__input title">
                <Field
                  name="title"
                  label="Title"
                  type="text"
                  component={InputField}
                  validate={[required, minLength]}
                />
              </div>

              <div className="form__input overview">
                <Field
                  name="overview"
                  label="Overview"
                  type="text"
                  component={InputField}
                  validate={[required, minLengthOverview, maxLength]}
                />
              </div>

              <div className="form__input poster">
                <Field
                  name="poster"
                  label="poster"
                  type="text"
                  component={InputField}
                  validate={[required]}
                />
              </div>

              <div className="form__input popularity">
                <Field
                  name="popularity"
                  label="Popularity"
                  type="number"
                  component={InputField}
                  validate={[required]}
                />
              </div>

              <div className="form__input release-date">
                <Field
                  name="release_date"
                  label="Release Date"
                  type="date"
                  component={InputField}
                  validate={[required]}
                />
              </div>

              <div className="form__input vote-average">
                <Field
                  name="vote_average"
                  label="Vote Average"
                  type="number"
                  component={InputField}
                  validate={[required]}
                />
              </div>

              <div className="form__input genres">
                <Field
                  name="genres"
                  label="Genre"
                  component={SelectFieldEdit}
                />


              </div>

              <div className="form__input vote_count">
                <Field
                  name="vote_count"
                  label="Votes"
                  type="number"
                  component={InputField}
                  validate={[required]}
                />
              </div>

              <div className="form__input adult">
                <Field
                  label="Is movie for adults?"
                  name="adult"
                  type="checkbox"
                  component={InputField}
                />
              </div>

              <div className="form__button--wrapper">
                <button type="button" className="form__button clear" onClick={reset} disabled={pristine || submitting}>clear data</button>
                <button type="submit" className="form__button send" disabled={invalid}>Submit information </button>
              </div>

            </form>

          </div>
        );
      }
      return <Redirect to="/404" />;
    }
}

const mapStateToProps = state => ({
  formData: getFormValues('AdminAddPanel')(state),
  user: selectUser(state)
});

const mapDispatchToProps = {
  addNewFilm,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'AdminAddPanel',
    enableReinitialize: true,
    onSubmit: (values, state, props) => {
      const newMovie = {
        vote_count: parseInt(values.vote_count, 10),
        id: generateRandomID(),
        video: false,
        vote_average: parseInt(values.vote_average, 10),
        title: values.title,
        popularity: parseInt(values.popularity, 10),
        poster_path: values.poster,
        release_date: values.release_date,
        genre_ids: [...values.genres],
        adult: values.adult,
        overview: values.overview,
      };

      props.addNewFilm(newMovie);
      props.reset();
    }
  })
)(AdminAddPanel);
