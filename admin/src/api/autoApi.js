"use strict";
var actions = require('../actions/autoActions');
var _ = require('lodash');
var Request = require('./request');

var AutoApi = {
    saveMaker: function(maker) {
        return Request.post("http://localhost:3000/saveMaker", maker);
    }
};

module.exports = AutoApi;