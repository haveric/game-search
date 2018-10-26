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
            },
            resultsLoading: false,
            hasSearched: false,
            apiError: false,
        }

        this.setQuery = this.setQuery.bind(this);
        this.queryDelay = null;
    }

    setQuery(e) {
        var self = this;
        const query = e.target.value;

        self.setState({
            query: query,
            resultsLoading: true,
            apiError: false,
        });

        // Delay querying to allow the user to type longer names and avoid needless queries
        clearTimeout(self.queryDelay);

        self.queryDelay = setTimeout(function () {
            fetch(`/games?q=${query}`)
                .then(res => res.json())
                .then(results => {
                    // Only display results if the query still matches the latest query
                    // Prevents out of order query returns
                    if (self.state.query === query) {
                        self.setState({
                            queryResults: results,
                            resultsLoading: false,
                            hasSearched: true,
                        });
                    }
                }).catch(function() {
                    self.setState({
                        apiError: true,
                    });
                });
        }, 250);
    }

    render() {
        const queryResults = this.state.queryResults;
        const results = queryResults.results;
        const pageResults = queryResults.number_of_page_results;
        const totalResults = queryResults.number_of_total_results;

        return (
            <div className="Search">
                <h1 className="Search__title">Search for a game:</h1>
                <input type="text" className="Search__input" onChange={this.setQuery} value={this.state.query} />

                <div className="Search__results">
                    {
                        this.state.hasSearched ?
                            <div>
                                <p className="Search__results-count">Showing Results {pageResults} of {totalResults}</p>
                            </div>
                        : null
                    }
                    
                    <div className="clearfix">
                        {
                            this.state.apiError ?
                                <div>
                                    <p className="Search__error">Error searching for results. Please try again later.</p>
                                </div>
                            :
                                this.state.resultsLoading ?
                                    <div className="Search__loader">Searching for results...</div>
                                :
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
                    {
                        this.state.hasSearched && !this.state.resultsLoading && pageResults === 0 ?
                            <div>
                                <p className="Search__noresults">No results for <strong>{this.state.query}</strong></p>
                            </div>
                        : null
                    }
                    <div className="clearfix">
                        <p className="Search__poweredby">Powered by <a href="https://www.giantbomb.com">Giantbomb</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
