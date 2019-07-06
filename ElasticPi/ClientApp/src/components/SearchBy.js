import React, { Component } from 'react';
import { SearchBar } from './SearchBar';

export class SearchBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false, selectedValue: "", selectedId: "", data: [], loading: true, url: 'api/search/getby', paramFieldUrl: "", chosenValue:""
        }
    }

    handleSelect = (event) => {
        event.preventDefault();
        this.setState({
            selected: true,
            selectedValue: event.target.value,
            selectedId: event.target.id,
            chosenValue: ""
        });
    }

    handleFieldValue = (event) => {
        var fieldValueUrl = event.target.name + "=" + event.target.value;
        console.log(fieldValueUrl);
        this.setState({
            paramFieldUrl: fieldValueUrl,
            chosenValue: event.target.value
        });
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

    resetData = (status) => {
        if(status === "true"){
            this.setState({
                paramFieldUrl: ""
            });
        }
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
        let contents = this.state.loading ? <p style={{ marginTop: '10px' }}><em>Data will appear here</em></p> : (this.state.data.length > 0) ? SearchBy.renderSearchTable(this.state.data) : <p style={{ marginTop: '10px' }}><em>No results found. Please check your query</em></p>;
        return (
            <div>
                <h2>Search By</h2>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="params" id="systemGuid" value="System GUID" onFocus={this.handleSelect}/>
                        <label class="form-check-label" for="systemGuid">
                            System GUID
                        </label>
                </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="params" id="organizationId" value="Organization ID" onFocus={this.handleSelect}/>
                            <label class="form-check-label" for="organizationId">
                                Organization ID
                            </label>
                    </div>
                        <div class="form-check disabled">
                            <input class="form-check-input" type="radio" name="params" id="sensorId" value="Sensor ID" onFocus={this.handleSelect}/>
                                <label class="form-check-label" for="sensorId">
                                    Sensor ID
                                </label>
                        </div>
                        <div class="form-check disabled">
                            <input class="form-check-input" type="radio" name="params" id="occupancyValue" value="Occupancy Value" onFocus={this.handleSelect}/>
                                <label class="form-check-label" for="occupancyValue">
                                    Occupancy Value
                                </label>
                        </div>
                <div className="form-group">
                    {this.state.selectedValue} {this.state.selected ? <input type="text" id="fields" className="form-control" onChange={this.handleFieldValue} name={this.state.selectedId} value={this.state.chosenValue}/> : ""}
                </div>
                <SearchBar fetchUrlBeginning={this.state.url} fetchUrlParamField={this.state.paramFieldUrl} fetchedData={this.fetchedData} loadingData={this.loadingData} resetData={this.resetData} />
                {contents}
            </div>
        )
    }
}