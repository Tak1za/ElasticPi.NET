import React, { Component } from 'react';



export class SearchAll extends Component {
    constructor(props) {
        super(props);
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
        let contents = this.props.loading ? <p style={{marginTop: '10px'}}><em>Data will appear here</em></p> : SearchAll.renderSearchTable(this.props.data);

        return (
            <div>
                {contents}
            </div>
        )
    }

}
