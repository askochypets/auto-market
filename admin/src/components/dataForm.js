"use strict";

var React = require('react');
var Input = require('./common/textInput');
var Button = require('./common/button');
var AutoActions = require('../actions/autoActions');

var DataForm = React.createClass({
    render: function () {
        return (
            <form name="formData">
                <div className="row">
                    <Input label="Enter Maker Name" name="maker" onChange={this.props.onChange} class="col-sm-2" />
                    <Input label="Enter Model Name" name="model" onChange={this.props.onChange} class="col-sm-2" />
                </div>
                <div className="row">
                    <Button name="saveData" value="Save Data" class="col-sm-2" onClick={AutoActions.saveMaker.bind(this, this.props.data)} />
                    <Button name="removeData" value="Remove Data" class="col-sm-2" onClick={AutoActions.removeMaker.bind(this, this.props.data)} />
                </div>
            </form>
        );
    }
});

module.exports = DataForm;
