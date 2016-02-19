// config/passport.js
var mysql      = require('mysql'),
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'automarket'
    });

connection.connect();

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function (passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log(user, "user");
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(login, done) {
        connection.query("SELECT * FROM users WHERE username ='" + login + "'", function (err, rows){
            done(err, rows);
        });
    });

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with login
            usernameField: 'UserName',
            passwordField: 'UserPassword',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, login, password, done) { // callback with email and password from our form
             //find a user whose login is the same as the forms login
             //we are checking to see if the user trying to login already exists
            connection.query('SELECT * FROM users u ' +
                'WHERE u.username = "' + login + '"', function(err, rows) {
                if (err) return done(err);

                if (!rows.length) {
                    return done(null, false);
                }
                if (!(rows[0].password == password)) {
                    return done(null, false);
                }
                return done(null, rows[0]); //return user as Object
            });

        }
    ));
};