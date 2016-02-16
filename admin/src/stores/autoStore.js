"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _auto = [];

var AutoStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    }
});

Dispatcher.register(function(action) {
    switch(action.actionType) {
        case ActionTypes.SAVE_MAKER:
            _auto.push(action.maker);
            AutoStore.emitChange();
            break;
        case ActionTypes.REMOVE_MAKER:
            var existingAuto = _.find(_auto, {maker: action.maker});
            var existingAutoIndex = _.indexOf(_auto, existingAuto);
            _auto.splice(existingAutoIndex, 1, action.maker);
            AutoStore.emitChange();
            break;
        /*
        case ActionTypes.UPDATE_AUTHOR:
            var existingAuthor = _.find(_auto, {id: action.author.id});
            var existingAuthorIndex = _.indexOf(_auto, existingAuthor);
            _auto.splice(existingAuthorIndex, 1, action.author);
            AutoStore.emitChange();
            break;
        case ActionTypes.DELETE_AUTHOR:
            debugger;
            _.remove(_auto, function(author) {
                return action.id === author.id;
            });
            AutoStore.emitChange();
            break;
        */
        default:
            // no op
    }
});

module.exports = AutoStore;