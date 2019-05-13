const initialState = {
  currentPage: 1,
  paginationRange: [1, 15]
};

// Constants
const INCREASE_CURRENT_PAGE = 'INCREASE_CURRENT_PAGE';
const DECREASE_CURRENT_PAGE = 'DECREASE_CURRENT_PAGE';
const SET_CURRENT_PAGE_FIRST = 'SET_CURRENT_PAGE_FIRST';
const SET_CURRENT_PAGE_LAST = 'SET_CURRENT_PAGE_LAST';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// Reducer
const pagination = (state = initialState, action) => {
  let newPageValue = state.currentPage;
  switch (action.type) {
    case INCREASE_CURRENT_PAGE:
      newPageValue = state.currentPage + 1;
      if (newPageValue >= state.paginationRange[0] && newPageValue <= state.paginationRange[1]) {
        return {
          ...state,
          currentPage: newPageValue
        };
      }
      break;
    case DECREASE_CURRENT_PAGE:
      newPageValue = state.currentPage - 1;
      if (newPageValue >= state.paginationRange[0] && newPageValue <= state.paginationRange[1]) {
        return {
          ...state,
          currentPage: newPageValue
        };
      }
      return {
        ...state,
        currentPage: state.currentPage
      };
    case SET_CURRENT_PAGE_FIRST:
      return {
        ...state,
        currentPage: state.paginationRange[0]
      };
    case SET_CURRENT_PAGE_LAST:
      return {
        ...state,
        currentPage: state.paginationRange[1]
      };
    case SET_CURRENT_PAGE:
      newPageValue = action.payload;
      if (newPageValue >= state.paginationRange[0] && newPageValue <= state.paginationRange[1]) {
        return {
          ...state,
          currentPage: newPageValue
        };
      }
      break;
    default:
      return state;
  }
  return 'I dont know what to return from reducer... But eslint says me, that return is a must!';
};

// Actions
const incrCurrentPage = () => (dispatch) => {
  dispatch({
    type: INCREASE_CURRENT_PAGE,
  });
};
const decrCurrentPage = () => (dispatch) => {
  dispatch({
    type: DECREASE_CURRENT_PAGE,
  });
};
const setCurrentPageFirst = () => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PAGE_FIRST,
  });
};
const setCurrentPageLast = () => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PAGE_LAST,
  });
};
const setCurrentPage = value => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: value
  });
};

// Selectors currentPage
const getCurrentPage = state => state.pagination.currentPage;
const getPaginationRange = state => state.pagination.paginationRange;

// Exports
export default pagination;
export {
  // actions
  incrCurrentPage,
  decrCurrentPage,
  setCurrentPageFirst,
  setCurrentPageLast,
  setCurrentPage,

  // selectors
  getCurrentPage,
  getPaginationRange
};
