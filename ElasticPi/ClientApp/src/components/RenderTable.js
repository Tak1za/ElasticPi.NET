import React from 'react';

export const renderOccupancyAggsSensorTable = (data) => {
    var i = 0;
    return (
        <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>Sensor ID</th>
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
                        <td>{result.sensorId}</td>
                        <td>{result.occupancyValue.avg}</td>
                        <td>{result.occupancyValue.sum}</td>
                        <td>{result.occupancyValue.max}</td>
                        <td>{result.occupancyValue.min}</td>
                        <td>{result.occupancyValue.cardinality}</td>
                        <td>{result.occupancyValue.value_count}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export const renderOccupancyAggsOrganizationTable = (data) => {
    var i = 0;
    return (
        <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
            <thead>
                <tr>
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
                        <td>{result.occupancyValue.value_count}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export const renderOccupancyAggsOrganizationSensorTable = (data) => {
    var i = 0;
    return (
        <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>Organization ID</th>
                    <th>Sensor ID</th>
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
                        <td>{result.sensorId}</td>
                        <td>{result.occupancyValue.avg}</td>
                        <td>{result.occupancyValue.sum}</td>
                        <td>{result.occupancyValue.max}</td>
                        <td>{result.occupancyValue.min}</td>
                        <td>{result.occupancyValue.cardinality}</td>
                        <td>{result.occupancyValue.value_count}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export const renderOccupancyAggsSystemOrganizationSensorTable = (data) => {
    var i = 0;
    return (
        <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>System GUID</th>
                    <th>Organization ID</th>
                    <th>Sensor ID</th>
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
                        <td>{result.systemGuid}</td>
                        <td>{result.organizationId}</td>
                        <td>{result.sensorId}</td>
                        <td>{result.occupancyValue.avg}</td>
                        <td>{result.occupancyValue.sum}</td>
                        <td>{result.occupancyValue.max}</td>
                        <td>{result.occupancyValue.min}</td>
                        <td>{result.occupancyValue.cardinality}</td>
                        <td>{result.occupancyValue.value_count}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export const renderOccupancyAggsOrganizationSystemTable = (data) => {
    var i = 0;
    return (
        <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>System GUID</th>
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
                        <td>{result.systemGuid}</td>
                        <td>{result.organizationId}</td>
                        <td>{result.occupancyValue.avg}</td>
                        <td>{result.occupancyValue.sum}</td>
                        <td>{result.occupancyValue.max}</td>
                        <td>{result.occupancyValue.min}</td>
                        <td>{result.occupancyValue.cardinality}</td>
                        <td>{result.occupancyValue.value_count}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export const renderOccupancyAggsSensorSystemTable = (data) => {
    var i = 0;
    return (
        <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>System GUID</th>
                    <th>Sensor ID</th>
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
                        <td>{result.systemGuid}</td>
                        <td>{result.sensorId}</td>
                        <td>{result.occupancyValue.avg}</td>
                        <td>{result.occupancyValue.sum}</td>
                        <td>{result.occupancyValue.max}</td>
                        <td>{result.occupancyValue.min}</td>
                        <td>{result.occupancyValue.cardinality}</td>
                        <td>{result.occupancyValue.value_count}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}