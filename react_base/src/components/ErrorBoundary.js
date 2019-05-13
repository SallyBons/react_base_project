import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends PureComponent {
    static propTypes = {
      children: PropTypes.array.isRequired,

    }

    state = {
      error: false,
    }

    componentDidCatch(error, info) {
      console.log('info', info);
      console.log('error', error);

      this.setState({error});
    }

    render() {
      const {error} = this.state;
      const {children} = this.props;

      return (

        error
          ? <p>Something went wrong, sorry.</p>
          : children

      );
    }
}

export default ErrorBoundary;
