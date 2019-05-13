
const initialState = {
  films: []
};

// Constants
const LOAD_FILMS = 'LOAD_FILMS';
const ADD_FILM = 'ADD_FILM';
const REMOVE_FILM = 'REMOVE FILM';
const UPDATE_FILM = 'UPDATE_FILM';

// Reducer
const films = (state = initialState, action) => {
  let filmsArray = [];
  switch (action.type) {
    case LOAD_FILMS:
      return {
        ...state,
        films: [...action.payload]
      };
    case ADD_FILM:
      if (state.films.length === 20) {
        filmsArray = state.films.slice(0, 19);
      } else {
        filmsArray = state.films;
      }
      return {
        ...state,
        films: [action.payload, ...filmsArray]
      };
    case REMOVE_FILM:
      return {
        ...state,
        films: [...state.films.filter(film => film.id !== action.payload.id)]
      };
    case UPDATE_FILM:
      return {
        ...state,
        films: [...state.films.map((film) => {
          if (film.id === action.payload.id) {
            // eslint-disable-next-line no-param-reassign
            film = action.payload;
          }
          return film;
        })]
      };
    default:
      return state;
  }
};

// Actions
const loadFilms = (page = 1) => (dispatch) => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8efedc660d998d9e85e631188f90f32d&language=en-US&include_adult=false&include_video=false&page=${page}`)// url api of films
    .then(result => result.json())
    .then((result) => {
      if (result.lenght !== 0) {
        dispatch({
          type: LOAD_FILMS,
          payload: result.results
        });
      }
    }).catch(() => {
      throw new Error('Cannot get data from API (API is unavaliable)');
    });
};
const addNewFilm = movie => (dispatch) => {
  dispatch({
    type: ADD_FILM,
    payload: movie
  });
};

const removeFilm = movie => (dispatch) => {
  dispatch({
    type: REMOVE_FILM,
    payload: movie
  });
};

const updateFilm = movie => (dispatch) => {
  dispatch({
    type: UPDATE_FILM,
    payload: movie
  });
};

// Selectors
const getState = state => state.films;
const selectFilms = state => getState(state).films;
const getFilmById = (state, id) => getState(state).films.find(film => film.id === +id);

export default films;
export {
  // actions
  loadFilms,
  addNewFilm,
  removeFilm,
  updateFilm,
  // selectors
  selectFilms,
  getFilmById,
};
