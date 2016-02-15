"use strict";

var React = require('react');

var Button = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        class: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    render: function() {
        return (
            <div className={this.props.class}>
                <button type="button"
                    name={this.props.name}
                    value={this.props.value}
                    className="btn btn-primary"
                    onclick={this.props.onClick}>
                    {this.props.value}
                </button>
            </div>
        );
    }
});

module.exports = Button;
