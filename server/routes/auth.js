const passport = require('passport');
const LocalStrategy = require('passport-local');
const mysql = require('mysql');

passport.use('local', new LocalStrategy((username, password, done)=>{

}));