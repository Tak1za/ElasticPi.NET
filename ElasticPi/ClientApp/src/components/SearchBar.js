import React, { Component } from 'react';

export class SearchBar extends Component {
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
        if (!this.props.fetchUrlParamField) {
            this.fetchUrl = this.props.fetchUrlBeginning + "?" + this.state.paramUrl;
        }
        else if(this.props.fetchUrlParamField !== "" && this.state.paramUrl !== ""){
            this.fetchUrl = this.props.fetchUrlBeginning + "?" + this.state.paramUrl + "&" + this.props.fetchUrlParamField
        }else{
            this.fetchUrl = this.props.fetchUrlBeginning + "?" + this.state.paramUrl;
        }
        console.log(this.fetchUrl);
        fetch(this.fetchUrl)
            .then(response => response.json())
            .then(data => {
                this.props.resetData("true");
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