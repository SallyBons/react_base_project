const initialState = {
  user: {},

};

// Constants

const LOAD_USER = 'LOAD_USER';

// Reducer

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

const loadUser = user => (dispatch) => {
  dispatch({
    type: LOAD_USER,
    payload: user
  });
};

const getState = state => state.user;
const selectUser = state => getState(state).user;

export default user;
export {
  //
  // actions
  loadUser,
  // selectors
  selectUser,
};
