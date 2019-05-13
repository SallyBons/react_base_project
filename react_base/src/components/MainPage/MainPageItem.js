import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';

import {removeFilm} from '../../reducer/films';
import {loadEdit} from '../../reducer/edit';
import {selectUser} from '../../reducer/user';

import {concatImgUrl} from '../../utils';

class MainPageItem extends PureComponent {
  static propTypes = {
    film: PropTypes.object.isRequired,
    removeFilm: PropTypes.func.isRequired,
    loadEdit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  removeFunction = () => {
    const {film, removeFilm} = this.props;
    removeFilm(film);
  }

  loadFilmToStore = () => {
    const {film, loadEdit} = this.props;
    loadEdit(film);
  }

  render() {
    const {film, user} = this.props;
    const url = concatImgUrl(film.poster_path);
    const CheckAdmin = () => {
      if (user.isAdmin) {
        return (
          <div className="card-wrapper__buttons--wrapper">
            <button type="submit" onClick={this.removeFunction}>Remove</button>
            <Link to={{pathname: '/edit'}} onClick={this.loadFilmToStore}> Edit information</Link>
          </div>
        );
      }
      return '';
    };
    return (
      <div className="card-wrapper">
        <Link to={`/films/${film.id}`}>
          <div className="mainpage-item">
            <img src={url} alt="film poster" />
            <div className="mainpage-item__content">
              <p>Title: <span>{film.title}</span></p>
            </div>
            <div className="mainpage-item__subcontent">
              <p>Vote: <span>{film.vote_average}</span></p>
              <p>Release date: <span>{film.release_date}</span></p>
            </div>
          </div>
        </Link>
        {CheckAdmin()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: selectUser(state)
});
export default connect(mapStateToProps, {removeFilm, loadEdit})(MainPageItem);
