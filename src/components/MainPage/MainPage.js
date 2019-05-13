import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {selectFilms, loadFilms} from '../../reducer/films';
import {getSelectorState, setSelectorState} from '../../reducer/filmSort';
import {getCurrentPage} from '../../reducer/pagination';
import MainPageItem from './MainPageItem';
import {selectUser} from '../../reducer/user';
import Filter from '../Filter';
import Pagination from '../Pagination';
import ErrorBoundary from '../ErrorBoundary';

import './styles.css';

class MainPage extends PureComponent {
  static propTypes = {
    films: PropTypes.array,
    currentPage: PropTypes.number.isRequired,
    loadFilms: PropTypes.func.isRequired,
    setSelectorState: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    sort: PropTypes.object.isRequired
  }

  state = {
    currentPageInState: 1,
  }

  componentDidUpdate() {
    const {currentPage, loadFilms} = this.props;
    const {currentPageInState} = this.state;

    if (currentPage !== currentPageInState) {
      loadFilms(currentPage);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        currentPageInState: currentPage
      });
    }
  }

filterFunc = (films, sort) => {
  const {loadFilms, currentPage, setSelectorState} = this.props;
  switch (sort.sort) {
    case 'ReleaseTopBottom':
      films.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      break;

    case 'ReleaseBottomTop':
      films.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      break;

    case 'RaitingTopBottom':
      films.sort((a, b) => b.vote_average - a.vote_average);
      break;

    case 'RaitingBottomTop':
      films.sort((a, b) => a.vote_average - b.vote_average);
      break;

    case 'None':
      loadFilms(currentPage);
      setSelectorState('');
      break;

    default:
      break;
  }
  return films;
}

render() {
  let {films} = this.props;
  const {sort, user} = this.props;
  films = this.filterFunc(films, sort);
  const isLogin = user;

  const CheckAdmin = () => {
    if (isLogin.isAdmin) {
      return <div> <Link className="add-new" to="/adminAddNew">Add New Movie</Link></div>;
    }
    return '';
  };

  return (
    <div className="mainpage-container">
      <div className="filter-add-new--wrapper">
        <Filter />
        {CheckAdmin()}
      </div>
      <div className="mainpage__cards--wrapper">
        <ErrorBoundary>
          {films.map(film => (
            <MainPageItem film={film} key={film.id} />
          ))}
        </ErrorBoundary>
      </div>
      <Pagination />
    </div>
  );
}
}

MainPage.defaultProps = {
  films: []
};

const mapStateToProps = state => ({
  films: selectFilms(state),
  sort: getSelectorState(state),
  currentPage: getCurrentPage(state),
  user: selectUser(state)
});

export default connect(mapStateToProps, {getSelectorState, loadFilms, setSelectorState})(MainPage);
