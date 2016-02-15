"use strict";
var actions = require('../actions/autoActions');
var _ = require('lodash');

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

function post(url, body) {
	return fetch(url, {
		method: 'post',
		body: JSON.stringify(body || {})
	}).then(function (res) {
		return res.json();
	});
}

var AutoApi = {
	saveMaker: function(maker) {
		var newMaker = post("http://localhost:3000/saveMaker", maker).then(actions.saveMaker.bind(actions));

		console.log(newMaker);
		return _clone(newMaker);
	}
};

module.exports = AutoApi;