const initialState = {
  genres: [],

};

// Constants

const LOAD_GENRES = 'LOAD_GENRES';

// Reducer

const genres = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GENRES:
      return {
        ...state,
        genres: [...action.payload]
      };
    default:
      return state;
  }
};

// Actions

const loadGenres = () => (dispatch) => {
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=8efedc660d998d9e85e631188f90f32d')
    .then(result => result.json())
    .then((result) => {
      if (result.lenght !== 0) {
        dispatch({
          type: LOAD_GENRES,
          payload: result.genres
        });
      }
    }).catch(() => {
      throw new Error('Cannot get data from API (API is unavaliable)');
    });
};

// Selectors
const getState = state => state.genres;
const selectGenres = state => getState(state).genres;
const getGenreById = (state, id) => getState(state).genres.find(genre => genre.id === +id);

export default genres;
export {
  // actions
  loadGenres,
  // selectors
  selectGenres,
  getGenreById
};
