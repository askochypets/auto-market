"use strict";

var Request = require('superagent');

var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

module.exports = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            Request.get(url)
                .set(headers)
                .end(function (err, res) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(res.body);
                });
        });
    },
    post: function (url, data) {
        return new Promise(function (resolve, reject) {
            Request.post(url)
                .set(headers)
                .send(data)
                .end(function (err, res) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(res.body);
                });
        });
    }
};