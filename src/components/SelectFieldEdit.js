import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectGenres} from '../reducer/genres';


class SelectFieldEdit extends Component {
  static propTypes = {
    values: PropTypes.array,
    genres: PropTypes.array.isRequired,
    input: PropTypes.object.isRequired,
  }

  state = {
    currentGenres: [],
    selectedValue: 28,
  }

  componentDidMount() {
    const {values} = this.props;
    if (values === undefined) {
      this.setState({
        currentGenres: []
      });
    } else {
      this.setState({
        currentGenres: values
      });
    }
  }


  getGenreName = (filmGenreId) => {
    const {genres} = this.props;
    for (let index = 0; index < genres.length; index += 1) {
      const element = genres[index];
      if (element.id === filmGenreId) {
        return element.name;
      }
    }
    return '';
  }

  removeGenreFromState = (genreId) => {
    let {currentGenres} = this.state;
    const {input} = this.props;
    currentGenres = currentGenres.filter(curGenreId => curGenreId !== parseInt(genreId, 10));
    input.onChange(input.value.filter(curGenreId => curGenreId !== parseInt(genreId, 10)));
    this.setState({
      currentGenres
    });
  }

  handleAddButton = () => {
    const {selectedValue} = this.state;
    const {input} = this.props;
    input.onChange([...input.value, selectedValue]);
    this.setState({
      currentGenres: [...input.value, selectedValue]
    });
  }

  onSelecterChange = (e) => {
    this.setState({
      selectedValue: parseInt(e.target.value, 10)
    });
  }

  render() {
    const {genres} = this.props;
    const {currentGenres} = this.state;
    return (
      <div>
        <div>
          <p>Current genres:</p>
          <ul>
            {currentGenres.map(genre => (
              <li key={genre}><span>{this.getGenreName(genre)}</span><span className="remove-span" onClick={() => this.removeGenreFromState(genre)} role="presentation">Remove</span></li>
            ))}
          </ul>
        </div>
        <div>
          <p>add new genre:</p>
          <div className="select-field-edit">
            <select onChange={this.onSelecterChange}>
              {genres.map(genre => (
                <option value={genre.id} key={genre.id}>{genre.name}</option>
              ))}
            </select>
            <div className="add-button" onClick={this.handleAddButton} role="presentation">Add genre</div>
          </div>
        </div>
      </div>
    );
  }
}
SelectFieldEdit.defaultProps = {
  values: []
};

const mapStateToProps = state => ({
  genres: selectGenres(state)
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SelectFieldEdit);
