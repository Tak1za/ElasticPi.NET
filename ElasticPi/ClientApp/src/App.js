import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { SearchAll } from './components/SearchAll'
import { SearchBy } from './components/SearchBy';
import { Aggregations } from './components/Aggregations';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/search-all' component={SearchAll} />
                <Route path='/search-by' component={SearchBy} />
                <Route path='/aggs' component={Aggregations} />
            </Layout>
        );
    }
}
