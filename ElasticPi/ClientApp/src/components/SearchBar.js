import React, { Component } from 'react';
import { SearchAll } from './SearchAll';
import { SearchBy } from './SearchBy';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], loading: true, url: 'api/search/getall', paramUrl: ''
        }
    }

    handleChange = event => {
        event.preventDefault();
        var newParamUrl = event.target.name + "=" + event.target.value;
        this.setState({
            paramUrl: newParamUrl
        });
    }

    fetchUrl = '';

    fetchData = () => {
        if (this.state.paramUrl === "") {
            this.fetchUrl = this.state.url;
        } else {
            this.fetchUrl = this.state.url + "?" + this.state.paramUrl;
        }
        fetch(this.fetchUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ data: data, loading: false });
            });

    }

    render() {
        return (
            <div>
                <div className="form-group">
                    Entries: <input type="text" className="form-control" onChange={this.handleChange} name="size" defaultValue="10" />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.fetchData}
                >
                    Submit
                </button>
                <SearchAll data={this.state.data} loading={this.state.loading} />
            </div>
        )
    }
}