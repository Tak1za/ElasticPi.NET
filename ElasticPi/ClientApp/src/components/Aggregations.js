import React, { Component } from 'react';
import { SearchBarAggs } from './SearchBarAggs';

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
        document.getElementById('occupancyValue').checked = false;
        this.setState({
            data: [],
            selectedGroupByArray: [],
            aggsSelect: "",
            boilerText: true
        });
    }

    static renderSearchTable(data) {
        var i = 0;
        return (
            <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
                <thead>
                    <tr id="rows">
                        <th>Organization ID</th>
                        <th>Average</th>
                        <th>Sum</th>
                        <th>Max</th>
                        <th>Min</th>
                        <th>Cardinality</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(result =>
                        <tr key={i++}>
                            <td>{result.organizationId}</td>
                            <td>{result.occupancyValue.avg}</td>
                            <td>{result.occupancyValue.sum}</td>
                            <td>{result.occupancyValue.max}</td>
                            <td>{result.occupancyValue.min}</td>
                            <td>{result.occupancyValue.cardinality}</td>
                            <td>{result.occupancyValue.count}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }


    render() {
        let dataAppearsHere = <p style={{ marginTop: '10px' }}><em>Data will appear here...</em></p>;
        let noResultsFound = <p style={{ marginTop: '10px' }}><em>No results found. Please check your query</em></p>;

        let contents = this.state.loading ? dataAppearsHere : (this.state.data.length > 0) ? Aggregations.renderSearchTable(this.state.data) : this.state.boilerText ? dataAppearsHere : noResultsFound;
        return (
            <div>
                <h2>Aggregations</h2>
                <br />
                <div className="form-group">
                    <em><h6>Group By:</h6></em>
                    <div class="form-check">
                        <div classname="form-check">
                            <input className="form-check-input" type="checkbox" name="organizationId" id="organizationId" value="Organization ID" onChange={this.handleGroupBySelect} />
                            <label className="form-check-label" for="organizationId">
                                Organization ID
                            </label>
                        </div>
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