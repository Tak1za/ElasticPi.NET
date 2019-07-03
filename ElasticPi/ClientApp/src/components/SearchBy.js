import React, { Component } from 'react';
import { SearchBar } from './SearchBar';

export class SearchBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false, value: ""
        }
    }

    handleSelect = (event) => {
        this.setState({
            selected: true,
            value: event.target.value + ":"
        })
    }

    render() {
        return (
            <div>
                <h2>Search By</h2>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="parameters" id="systemGuid" value="System GUID" onClick={this.handleSelect}/>
                        <label class="form-check-label" for="systemGuid" onClick={this.handleSelect}>
                            System GUID
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="parameters" id="organizationId" value="Organization ID" onClick={this.handleSelect}/>
                        <label class="form-check-label" for="organizationId" onClick={this.handleSelect}>
                            Organization ID
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="parameters" id="sensorId" value="Sensor ID" onClick={this.handleSelect}/>
                        <label class="form-check-label" for="sensorId" onClick={this.handleSelect}>
                            Sensor ID
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="parameters" id="occupancyValue" value="Occupancy Value" onClick={this.handleSelect}/>
                        <label class="form-check-label" for="occupancyValue" onClick={this.handleSelect}>
                            Occupancy Value
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    {this.state.value} {this.state.selected ? <input type="text" className="form-control"/> : ""}
                </div>
                <SearchBar />
            </div>
        )
    }
}