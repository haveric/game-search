import React, { Component } from 'react';
import Search from './components/Search';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Search />
            </div>
        );
    }
}

export default App;
