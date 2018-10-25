import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchResult.css';

class SearchResult extends Component {
    state = {}

    componentDidMount() {
    }

    render() {
        return (
            <div className="SearchResult clearfix">
                <div className="SearchResult__image-wrap">
                    <img className="SearchResult__image" src={this.props.image} alt={this.props.title} />
                </div>
                <div className="SearchResult__content">
                    <h2 className="SearchResult__title">{this.props.title}</h2>
                    <p className="SearchResult__description">{this.props.description}</p>
                </div>
            </div>
        );
    }
}

SearchResult.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default SearchResult;
