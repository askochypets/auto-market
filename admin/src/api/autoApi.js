"use strict";
var actions = require('../actions/autoActions');
var _ = require('lodash');
var Request = require('./request');

var AutoApi = {
    saveMaker: function(maker) {
        return Request.post("/saveMaker", maker);
    },
    removeMaker: function (maker) {
        return Request.post("/removeMaker", maker);
    }
};

module.exports = AutoApi;