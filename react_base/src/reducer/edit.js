const initialState = {
  edit: {}
};

// Constants
const LOAD_TO_STORE = 'LOAD_TO_STORE';

// Reducer
const edit = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TO_STORE:
      return {
        ...state,
        edit: action.payload
      };
    default:
      return state;
  }
};

// Actions
const loadEdit = film => (dispatch) => {
  dispatch({
    type: LOAD_TO_STORE,
    payload: film
  });
};

// Selectors
const getState = state => state.edit;
const selectEdit = state => getState(state).edit;

export default edit;
export {
  // actions
  loadEdit,
  // selectors
  selectEdit,

};
