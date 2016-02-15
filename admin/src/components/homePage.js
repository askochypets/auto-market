"use strict";

var React = require('react');
var Router = require('react-router');
var Input = require('./common/textInput');
var Button = require('./common/button');
var AutoActions = require('../actions/autoActions');

var Home = React.createClass({
    render: function() {
        return (
            <div className="container">
                <h1>Administration Panel</h1>
                <form name="formData">
                    <div className="row">
                            <Input label="Enter Maker Name" name="maker" class="col-sm-2" />
                            <Input label="Enter Model Name" name="model" class="col-sm-2" />
                    </div>
                    <div className="row">
                        <Button name="saveData" value="Save Data" class="col-sm-2" onClick={AutoActions.saveMaker({maker: "asda"})} />
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = Home;