import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import InputField from '../InputField';
import {
  required, minLength, minLengthOverview, maxLength
} from '../validation';
import SelectFieldEdit from '../SelectFieldEdit';

import {updateFilm} from '../../reducer/films';
import {loadEdit, selectEdit} from '../../reducer/edit';

import {isEmpty} from '../../utils';

class Edit extends PureComponent {
    static propTypes = {
      handleSubmit: PropTypes.func.isRequired,
      invalid: PropTypes.bool.isRequired,
      edit: PropTypes.object.isRequired,
    }

    render() {
      const {handleSubmit, invalid, edit} = this.props;

      if (isEmpty(edit)) {
        return <Redirect to="/" />;
      }
      return (
        <div className="form add-new-movie">
          <h1 className="form__headline">Edit information</h1>
          <form onSubmit={handleSubmit}>
            <div className="form__input title">
              <Field
                name="id"
                label="Id"
                type="text"
                component={InputField}
                validate={required}
              />
            </div>
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
                name="release_data"
                label="Release Data"
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
                label="Genre IDs"
                values={edit.genre_ids}
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
            <div className="form__button--wrapper edit">
              <button type="submit" className="form__button send" disabled={invalid}>Save information </button>
            </div>
          </form>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const edit = selectEdit(state);
  return {
    initialValues: {
      id: edit.id,
      title: edit.title,
      popularity: edit.popularity,
      release_data: edit.release_date,
      vote_average: edit.vote_average,
      poster: edit.poster_path,
      vote_count: edit.vote_count,
      overview: edit.overview,
      adult: edit.adult,
      genres: edit.genre_ids
    },
    edit
  };
};

export default compose(
  connect(mapStateToProps, {updateFilm, loadEdit}),
  reduxForm({
    form: 'Edit',
    enableReinitialize: true,
    onSubmit: (values, state, props) => {
      const newMovie = {
        vote_count: parseInt(values.vote_count, 10),
        id: parseInt(values.id, 10),
        video: false,
        vote_average: parseInt(values.vote_average, 10),
        title: values.title,
        popularity: parseInt(values.popularity, 10),
        poster_path: values.poster,
        release_date: values.release_data,
        genre_ids: [...values.genres],
        adult: values.adult,
        overview: values.overview,
      };


      props.updateFilm(newMovie);
      props.reset();
      props.loadEdit({});
    }
  })
)(Edit);
