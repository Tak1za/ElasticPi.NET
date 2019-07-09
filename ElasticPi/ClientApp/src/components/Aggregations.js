import React, { Component } from 'react';
import { SearchBarAggs } from './SearchBarAggs';
import { renderOccupancyAggsOrganizationTable } from './RenderTable.js';
import { renderOccupancyAggsSensorTable } from './RenderTable.js';
import { renderOccupancyAggsOrganizationSensorTable } from './RenderTable.js';


export class Aggregations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [], loading: true, url: 'api/aggs/getaggs', selectedGroupByArray: [], aggsSelect: ""
        }
    }

    handleGroupBySelect = (event) => {
        if (event.target.checked) {
            this.setState({
                selectedGroupByArray: [...this.state.selectedGroupByArray, event.target.id]
            });
        } else {
            this.setState({
                selectedGroupByArray: this.state.selectedGroupByArray.filter(item => item !== event.target.id)
            });
        }
    }

    handleAggsSelect = (event) => {
        this.setState({
            aggsSelect: event.target.id
        })

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

    clearData = () => {
        document.getElementById('organizationId').checked = false;
        document.getElementById('sensorId').checked = false;
        document.getElementById('occupancyValue').checked = false;
        this.setState({
            data: [],
            selectedGroupByArray: [],
            aggsSelect: "",
            boilerText: true
        });
    }

    render() {
        let dataAppearsHere = <p style={{ marginTop: '10px' }}><em>Data will appear here...</em></p>;
        let noResultsFound = <p style={{ marginTop: '10px' }}><em>No results found. Please check your query</em></p>;



        let contents;
        if (this.state.loading) {
            contents = dataAppearsHere;
        }
        else {
            if (this.state.data.length > 0 && this.state.selectedGroupByArray.length === 1 && this.state.selectedGroupByArray[0] === "organizationId") {
                contents = renderOccupancyAggsOrganizationTable(this.state.data);
            }
            else if (this.state.data.length > 0 && this.state.selectedGroupByArray.length === 1 && this.state.selectedGroupByArray[0] === "sensorId") {
                contents = renderOccupancyAggsSensorTable(this.state.data);
            }
            else if (this.state.data.length > 0 && this.state.selectedGroupByArray.length === 2 && ((this.state.selectedGroupByArray[0] === "sensorId" && this.state.selectedGroupByArray[1] === "organizationId") || (this.state.selectedGroupByArray[0] === "organizationId" && this.state.selectedGroupByArray[1] === "sensorId"))) {
                contents = renderOccupancyAggsOrganizationSensorTable(this.state.data);

            }
            else {
                if (this.state.boilerText) {
                    contents = dataAppearsHere;
                } else {
                    contents = noResultsFound;
                }
            }
        }
        return (
            <div>
                <h2>Aggregations</h2>
                <br />
                <div className="form-group">
                    <em><h6>Group By:</h6></em>
                    <div classname="form-check">
                        <input className="form-check-input" type="checkbox" name="organizationId" id="organizationId" value="Organization ID" onChange={this.handleGroupBySelect} />
                        <label className="form-check-label" for="organizationId">Organization ID</label>
                    </div>
                    <div classname="form-check">
                        <input className="form-check-input" type="checkbox" name="sensorId" id="sensorId" value="Sensor ID" onChange={this.handleGroupBySelect} />
                        <label className="form-check-label" for="sensorId">Sensor ID</label>
                    </div>
                </div>
                <em><h6>Aggregations:</h6></em>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="occupancyValue" id="occupancyValue" value="Occupancy Value" onChange={this.handleAggsSelect} />
                        <label className="form-check-label" for="occupancyValue">Occupancy Value</label>
                    </div>
                </div>
                <div className="form-group">
                    <SearchBarAggs fetchUrlBeginning={this.state.url} fetchedData={this.fetchedData} loadingData={this.loadingData} selectedGroupByArray={this.state.selectedGroupByArray} selectedAggs={this.state.aggsSelect} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="button" onClick={this.clearData}>Clear</button>
                </div>
                {contents}
            </div>
        )
    }
}