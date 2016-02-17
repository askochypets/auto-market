"use strict";

var React = require('react');
var DataForm = require('./dataForm');

var Home = React.createClass({
    getInitialState: function () {
        return {
            data: {maker: '', model: ''}
        };
    },
    setDataState: function (event) {
        var field = event.target.name,
            value = event.target.value;

        this.state.data[field] = value;
        return this.setState({data: this.state.data});
    },
    render: function() {
        return (
            <div className="container">
                <h1>Administration Panel</h1>
                <DataForm
                    data={this.state.data}
                    onChange={this.setDataState} />
            </div>
        );
    }
});

module.exports = Home;