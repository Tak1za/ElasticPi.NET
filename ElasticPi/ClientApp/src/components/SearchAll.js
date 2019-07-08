import React, { Component } from 'react';
import { SearchBar } from './SearchBar';

export class SearchAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], loading: true, url: 'api/search/getall', boilerText: false
        }
    }

    fetchedData = (data) => {
        this.setState({
            data: data,
            boilerText: false
        });
    }

    loadingData = (status) => {
        this.setState({
            loading: status
        });
    }

    resetData = (status) => {
        if (status === "true") {
            this.setState({
                data: []
            });
        }
    }

    clearData = () => {
        this.setState({
            data: [],
            boilerText: true
        });
        document.getElementById("entries").value = "";
    }

    static renderSearchTable(data) {
        var i = 0;
        return (
            <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>System GUID</th>
                        <th>Organization ID</th>
                        <th>Sensor ID</th>
                        <th>Occupancy Value</th>
                        <th>Capture Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(result =>
                        <tr key={i++}>
                            <td>{result.systemGuid}</td>
                            <td>{result.organizationId}</td>
                            <td>{result.sensorId}</td>
                            <td>{result.occupancyValue}</td>
                            <td>
                                {result.captureTime.split('T')[0].substr(6, 2) + "/" +
                                    result.captureTime.split('T')[0].substr(4, 2) + "/" +
                                    result.captureTime.split('T')[0].substr(0, 4) + "--" +
                                    result.captureTime.split('T')[1].substr(0, 2) + ":" +
                                    result.captureTime.split('T')[1].substr(2, 2) + ":" +
                                    result.captureTime.split('T')[1].substr(4, 2) + " hrs"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    render() {
        let dataAppearsHere = <p style={{ marginTop: '10px' }}><em>Data will appear here...</em></p>;
        let noResultsFound = <p style={{ marginTop: '10px' }}><em>No results found. Please check your query</em></p>;

        let contents = this.state.loading ? dataAppearsHere : (this.state.data.length > 0) ? SearchAll.renderSearchTable(this.state.data) : this.state.boilerText ? dataAppearsHere : noResultsFound;

        return (
            <div>
                <h2>Search All</h2>
                <div className="form-group">
                    <SearchBar fetchUrlBeginning={this.state.url} fetchedData={this.fetchedData} loadingData={this.loadingData} resetData={this.resetData} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="button" onClick={this.clearData}>Clear</button>
                </div>
                {contents}
            </div>
        )
    }

}
