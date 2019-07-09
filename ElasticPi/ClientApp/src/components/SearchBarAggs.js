﻿import React, { Component } from 'react';

export class SearchBarAggs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paramUrl: 'size=10'
        }
    }

    handleChange = event => {
        event.preventDefault();
        var newParamUrl = event.target.name + "=" + event.target.value;
        this.setState({
            paramUrl: newParamUrl
        });
    }

    fetchUrl = '';

    fetchData = () => {
        if (this.props.selectedGroupByArray.length === 0 || this.props.selectedOccupancyArray.length === 0) {
            this.fetchUrl = this.props.fetchUrlBeginning + "?" + this.state.paramUrl;
        }
        else {
            this.fetchUrl = this.props.fetchUrlBeginning + "?" + this.state.paramUrl;
            for (var i = 0; i < this.props.selectedGroupByArray.length; i++) {
                this.fetchUrl += "&groupby=" + this.props.selectedGroupByArray
            }
            for (var i = 0; i < this.props.selectedOccupancyArray.length; i++) {
                this.fetchUrl += "&aggsOccupancy=" + this.props.selectedOccupancyArray[i]
            }
        }
        console.log(this.fetchUrl);
        fetch(this.fetchUrl)
            .then(response => response.json())
            .then(data => {
                this.props.fetchedData(data);
                this.props.loadingData(false);
            });
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    Entries <input type="text" className="form-control" onChange={this.handleChange} name="size" defaultValue="10" />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.fetchData}
                >
                    Submit
                </button>
            </div>
        )
    }
}