import {combineReducers} from 'redux';
import films from './films';
import genres from './genres';
import user from './user';
import edit from './edit';
import sort from './filmSort';
import pagination from './pagination';
import formsReducer from './forms';

const rootReducer = combineReducers({
  films, form: formsReducer, genres, user, edit, sort, pagination
});

export default rootReducer;
