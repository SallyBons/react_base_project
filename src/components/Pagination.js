import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import {connect} from 'react-redux';
import {
  incrCurrentPage, decrCurrentPage, setCurrentPageFirst, setCurrentPageLast,
  getCurrentPage, getPaginationRange, setCurrentPage
} from '../reducer/pagination';

class Pagination extends Component {
    static propTypes = {
      paginationRange: PropTypes.array.isRequired,
      setCurrentPageFirst: PropTypes.func.isRequired,
      decrCurrentPage: PropTypes.func.isRequired,
      incrCurrentPage: PropTypes.func.isRequired,
      setCurrentPageLast: PropTypes.func.isRequired,
      setCurrentPage: PropTypes.func.isRequired,
      currentPage: PropTypes.number.isRequired,
    }

    state = {
      pages: []
    }

    componentDidMount() {
      const {paginationRange} = this.props;
      const newPagesArray = Array(paginationRange[1]);

      let pageCounter = paginationRange[0];
      for (let index = 0; index < newPagesArray.length; index += 1) {
        newPagesArray[index] = pageCounter;
        pageCounter += 1;
      }

      this.setState({pages: newPagesArray});
    }

    // Click Handlers
    handleFirstPageClick = () => {
      const {setCurrentPageFirst} = this.props;
      setCurrentPageFirst();
    }

    handlePrevPageClick = () => {
      const {decrCurrentPage} = this.props;
      decrCurrentPage();
    }

    handleNextPageClick = () => {
      const {incrCurrentPage} = this.props;
      incrCurrentPage();
    }

    handleLastPageClick = () => {
      const {setCurrentPageLast} = this.props;
      setCurrentPageLast();
    }

    handleItemClick = (value) => {
      const {setCurrentPage} = this.props;
      setCurrentPage(value);
    }

    render() {
      let {pages} = this.state;
      const {currentPage} = this.props;

      switch (currentPage) {
        case pages[0]:
          pages = pages.slice(pages[-1], pages[4]);
          break;
        case pages[1]:
          pages = pages.slice(pages[-1], pages[4]);
          break;
        case pages[pages.length - 1]:
          pages = pages.slice(pages[pages.length - 6], pages[pages.length - 1]);
          break;
        case pages[pages.length - 2]:
          pages = pages.slice(pages[pages.length - 6], pages[pages.length - 1]);
          break;
        default:
          pages = pages.slice(pages[currentPage - 4], pages[currentPage + 1]);
          break;
      }

      return (
        <div className="main-pagination">
          <ul className="pagination-items">

            <li className="pagination-sides" onClick={this.handleFirstPageClick} role="presentation">First</li>
            <li className="pagination-presides" onClick={this.handlePrevPageClick} role="presentation">Previous</li>

            {pages.map(page => (
              <li key={page} className={`pagination-item ${page === currentPage ? 'active' : ''}`} onClick={() => this.handleItemClick(page)} role="presentation">
                {page}
              </li>
            ))}

            <li className="pagination-presides" onClick={this.handleNextPageClick} role="presentation">Next</li>
            <li className="pagination-sides" onClick={this.handleLastPageClick} role="presentation">Last</li>
          </ul>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  currentPage: getCurrentPage(state),
  paginationRange: getPaginationRange(state)
});

const mapDispatchToProps = {
  incrCurrentPage,
  decrCurrentPage,
  setCurrentPageFirst,
  setCurrentPageLast,
  setCurrentPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
