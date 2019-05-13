import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';
import {Link, Redirect} from 'react-router-dom';
import {getFilmById, removeFilm, updateFilm} from '../../reducer/films';
import {selectUser} from '../../reducer/user';
import {concatImgUrl, isEmpty} from '../../utils';
import {selectGenres} from '../../reducer/genres';
import {loadEdit} from '../../reducer/edit';


class FilmCard extends PureComponent {
  static propTypes = {
    film: PropTypes.object,
    genres: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    removeFilm: PropTypes.func.isRequired,
    loadEdit: PropTypes.func.isRequired,
    updateFilm: PropTypes.func.isRequired,
  }

  state = {
    userRaiting: null,
  }

  getGenreName = (filmGenreId) => {
    const {genres} = this.props;
    for (let index = 0; index < genres.length; index += 1) {
      const element = genres[index];
      if (element.id === filmGenreId) {
        return element.name;
      }
    }
    return '';
  }

  removeFunction = () => {
    const {film, removeFilm} = this.props;
    removeFilm(film);
  }

  loadFilmToStore = () => {
    const {film, loadEdit} = this.props;
    loadEdit(film);
  }

  handleRatingChange = (e) => {
    this.setState({
      userRaiting: e.target.value
    });
  }

  handleSubmitRaiting = () => {
    const {film, updateFilm} = this.props;
    const {userRaiting} = this.state;

    if (userRaiting) {
      film.vote_count = parseInt(film.vote_count + 1, 10);
      this.setState({
        userRaiting: null,
      });

      updateFilm(film);
    }
  }


  render() {
    const {film, user} = this.props;
    const checkAdmin = () => {
      if (user.isAdmin) {
        return (
          <div className="post-container__edit-buttons">
            <Link className="edit" to={{pathname: '/edit'}} onClick={this.loadFilmToStore}>Edit information</Link>
            <button type="submit" className="remove" onClick={this.removeFunction}>Remove</button>
          </div>
        );
      }
      return '';
    };
    const checkUser = () => {
      if (!isEmpty(user)) {
        return (
          <div className="rate-this-film">
            <h3>Rate this film</h3>
            <input onChange={this.handleRatingChange} />
            <button type="submit" onClick={this.handleSubmitRaiting}>Submit raiting</button>
          </div>
        );
      }
      return '';
    };


    if (film !== undefined) {
      const filmsIds = film.genre_ids;
      const filmsGenreNames = filmsIds.map(id => this.getGenreName(id));
      const url = concatImgUrl(film.poster_path);
      return (
        <div className="post-container">
          {checkAdmin()}
          <div className="post-image">
            <img src={url} alt="film poster" />
          </div>
          <div className="post-content">
            <div className="post-text">
              <h1>{film.title}</h1>
              <p> Vote count: <span>{film.vote_count}</span></p>
              <p> Genres: </p>
              <ul>
                <span>{filmsGenreNames.map(movie => (
                  <li key={movie}>{movie}</li>
                ))}
                </span>
              </ul>
              <p> Vote average: <span>{film.vote_average}</span></p>
              <p> Popularity: <span>{film.popularity}</span></p>
              <p> Release date: <span>{film.release_date}</span></p>
              <p> Overview: <span>{film.overview}</span></p>
            </div>
            {checkUser()}
          </div>
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}
FilmCard.defaultProps = {
  film: {}
};

const mapStateToProps = (state, props) => {
  const {match: {params}} = props;
  return {
    film: getFilmById(state, params.id),
    genres: selectGenres(state),
    user: selectUser(state)
  };
};

const mapDispatchToProps = {
  loadEdit,
  removeFilm,
  updateFilm,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmCard);
