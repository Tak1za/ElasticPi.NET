﻿import React, { Component } from 'react';
import {SearchBar} from './SearchBar';

export class SearchAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], loading: true, url: 'api/search/getall', paramUrl: ''
        }
    }

    fetchedData = (data) => {
        this.setState({
            data: data
        });
    }

    loadingData = (status) => {
        this.setState({
            loading: status
        });
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
        let contents = this.state.loading ? <p style={{marginTop: '10px'}}><em>Data will appear here</em></p> : SearchAll.renderSearchTable(this.state.data);

        return (
            <div>
                <SearchBar fetchUrlBeginning={this.state.url} fetchUrlParam={this.state.paramUrl} fetchedData={this.fetchedData} loadingData={this.loadingData}/>
                {contents}
            </div>
        )
    }

}
