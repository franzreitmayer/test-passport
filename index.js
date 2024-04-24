const express = require('express');
const apiRoute = require('./routes/api'); 

const bodyParser = require('body-parser');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());



app.use('/api', passport.authenticate('basic', {session: false}), apiRoute);

const authenticate = (username, password) => 
    username === 'admin' && password === 'password';

const strategy = new BasicStrategy( async (username, password, done) => {
    const authenticated = await authenticate(username, password);
    if (!authenticated) {
        done('Wrong authentication');
    } else {
        done(null, {username});
    }
});

passport.use(strategy);

app.listen(8080);
