"use strict";

var React = require('react');
var Router = require('react-router');

var Header = React.createClass({
	render: function() {
		return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/logout">Log Out</a></li>
              </ul>
          </div>
        </nav>
		);
	}
});

module.exports = Header;
