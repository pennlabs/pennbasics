import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Component to render when a page is not found
 */
class NotFound extends Component {
  // Set the default props
  static defaultProps = {
    title: '404: Content not found',
    message: 'It seems like the content you are looking for was either moved or does not exist.',
    urlTest: 'Back to home',
    url: '/'
  }

  // Render the component
  render() {
    return (
      <div>
        <h1 className="is-size-3 medium-gray-text">
          {this.props.title}
        </h1>
        <p>
          {this.props.message}
        </p>
        <Link to={this.props.url} className="btn marg-top-1">
          {this.props.urlText}
        </Link>
      </div>
    );
  }
}

export default NotFound
