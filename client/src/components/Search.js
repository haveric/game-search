import React, { Component } from 'react';
import SearchResult from './SearchResult';
import './Search.css';

class Search extends Component {
    constructor() {
        super();

        this.state = {
            query: "", 
            queryResults: {
                number_of_page_results: 0,
                number_of_total_results: 0,
                results: []
            }
        }
        this.setQuery = this.setQuery.bind(this);
    }
  

  componentDidMount() {

  }

  setQuery(e) {
      const query = e.target.value;
      this.setState({
        query: query,
      });

      fetch(`/games?q=${query}`)
      .then(res => res.json())
      .then(results => {
        if (this.state.query === query) {  
            this.setState({queryResults: results})
        }
        
        });
  }

  render() {
      const queryResults = this.state.queryResults;
      const results = queryResults.results;
      const pageResults = queryResults.number_of_page_results;
      const totalResults = queryResults.number_of_total_results;
    return (
        <div className="Search">
            <h1 className="Search__title">Search for a game:</h1>
            <input type="text" className="Search__input" onChange={ this.setQuery } value={ this.state.query } />

            <div className="Search__results clearfix">
                <p className="Search__results-count">Showing Results {pageResults} of {totalResults}</p>
                <p className="Search__poweredby">Powered by <a href="https://www.giantbomb.com">Giantbomb</a></p>

                {
                    results.map(game => (
                        <SearchResult 
                            key={game.id}
                            title={game.name}
                            image={game.image.medium_url}
                            description={game.deck}
                        />
                    ))
                }
            </div>
        </div>
    );
  }
}

export default Search;
