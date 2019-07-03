import React, { Component } from 'react';
import { SearchBar } from './SearchBar';

export class SearchBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false, selectedValue: "", selectedId: "", data: [], loading: true, url: 'api/search/getby', paramFieldUrl: ""
        }
    }

    handleSelect = (event) => {
        event.preventDefault();
        this.setState({
            selected: true,
            selectedValue: event.target.value,
            selectedId: event.target.id
        });
    }

    handleFieldValue = (event) => {
        event.preventDefault();
        var fieldValueUrl = event.target.name + "=" + event.target.value;
        this.setState({
            paramFieldUrl: fieldValueUrl
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
                selectedId: "",
                selectedValue: "",
                selected: false,
                paramFieldUrl: ""
            });
        }
    }

    render() {
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
                    {this.state.selectedValue} {this.state.selected ? <input type="text" id="fields" className="form-control" onChange={this.handleFieldValue} name={this.state.selectedId}/> : ""}
                </div>
                <SearchBar fetchUrlBeginning={this.state.url} fetchUrlParamField={this.state.paramFieldUrl} fetchedData={this.fetchedData} loadingData={this.loadingData} resetData={this.resetData}/>
            </div>
        )
    }
}