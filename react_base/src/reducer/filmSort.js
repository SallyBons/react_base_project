const initialState = {
  sort: ''
};

// Constants

const SET_SELECTOR = 'SET_SELECTOR';

// Reducer

const sort = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTOR:
      return {
        ...state,
        sort: action.payload
      };
    default:
      return state;
  }
};

const setSelectorState = selectorState => (dispatch) => {
  dispatch({
    type: SET_SELECTOR,
    payload: selectorState
  });
};

const getSelectorState = state => state.sort;

export default sort;
export {
  // actions
  setSelectorState,
  // selectors
  getSelectorState
};
