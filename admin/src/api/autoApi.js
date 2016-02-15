"use strict";
var actions = require('../actions/autoActions');
var _ = require('lodash');

var _clone = function(item) {
    return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

function post(url, data, result) {
    return $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function(response) {
            result.response = response;   // Store response into result
        }
    });
}

var AutoApi = {
    saveMaker: function(maker) {
        var newMaker = {};

        post("http://localhost:3000/saveMaker", maker, newMaker);

        return _clone(newMaker.response);
    }
};

module.exports = AutoApi;