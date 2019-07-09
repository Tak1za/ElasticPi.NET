import React, { Component } from 'react';
import { SearchBarAggs } from './SearchBarAggs';

export class Aggregations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [], loading: true, url: 'api/aggs/getaggs', selectedGroupByArray: [], selectedOccupancyArray: []
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

    handleOccupancySelect = (event) => {
        if (event.target.checked) {
            this.setState({
                selectedOccupancyArray: [...this.state.selectedOccupancyArray, event.target.id]
            });
        } else {
            this.setState({
                selectedOccupancyArray: this.state.selectedOccupancyArray.filter(item => item !== event.target.id)
            });
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

    static renderSearchTable(data) {
        var i = 0;
        return (
            <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
                <thead>
                    <tr id="rows">
                        <th>Organization ID</th>
                        <th>Average</th>
                        <th>Sum</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(result =>
                        <tr key={i++}>
                            <td>{result.organizationId}</td>
                            <td>{result.occupancyValue.avg}</td>
                            <td>{result.occupancyValue.sum}</td>
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
                        <label className="form-check-label">Occupancy Value: </label>
                        <div class="form-check">
                            <input className="form-check-input" type="checkbox" name="avg" id="avg" value="Average" onChange={this.handleOccupancySelect} />
                            <label className="form-check-label" for="avg">
                                Average
                        </label>
                        </div>
                        <div class="form-check">
                            <input className="form-check-input" type="checkbox" name="sum" id="sum" value="Sum" onChange={this.handleOccupancySelect} />
                            <label className="form-check-label" for="sum">
                                Sum
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <SearchBarAggs fetchUrlBeginning={this.state.url} fetchedData={this.fetchedData} loadingData={this.loadingData} selectedGroupByArray={this.state.selectedGroupByArray} selectedOccupancyArray={this.state.selectedOccupancyArray} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="button">Clear</button>
                </div>
                {contents}
            </div>
        )
    }
}