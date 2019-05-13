import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import MainPage from '../MainPage';
import FilmCard from '../FilmCard';
import Navigation from '../Navigation';
import {loadGenres} from '../../reducer/genres';
import LogIn from '../LogIn';
import RegistrationForm from '../RegistrationForm';
import AdminAddPanel from '../AdminAddPanel';
import NotFound from '../NotFound';
import LogOut from '../LogOut';
import Edit from '../FilmCard/Edit';
import {loadFilms} from '../../reducer/films';

class App extends PureComponent {
  static propTypes = {
    loadGenres: PropTypes.func.isRequired,
    loadFilms: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {loadGenres, loadFilms} = this.props;
    loadGenres();
    loadFilms();
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/films/:id" component={FilmCard} />
            <Route
              path="/login"
              render={() => <LogIn />}
            />
            <Route
              path="/reg"
              render={() => <RegistrationForm />}
            />
            <Route
              path="/adminAddNew"
              render={() => <AdminAddPanel />}
            />
            <Route
              path="/edit"
              render={() => <Edit />}
            />
            <Route
              path="/logout"
              render={() => <LogOut />}
            />
            <Route
              path="/404"
              render={() => <NotFound />}
            />
            <Redirect to="/404" />
          </Switch>
        </div>

      </BrowserRouter>
    );
  }
}

export default connect(null, {loadGenres, loadFilms})(App);
