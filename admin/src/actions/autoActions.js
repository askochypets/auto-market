"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AutoApi = require('../api/autoApi');
var ActionTypes = require('../constants/actionTypes');

var AutoActions = {
    // Example
    /*createAuthor: function(author) {
        var newAuthor = AuthorApi.saveAuthor(author);

        //Hey dispatcher, go tell all the stores that an author was just created.
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        });
    }*/

    saveMaker: function(maker) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SAVE_MAKER,
            maker: AutoApi.saveMaker(maker)
        });
    }
};

module.exports = AutoActions;