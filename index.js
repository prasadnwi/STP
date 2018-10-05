const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nocache = require('nocache');

const app = express();

const PORT = 3000;

// Applying middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(nocache());

// Views
app.use(express.static('pages'));

// controllers
var controller = require('./controller');

// Server Startup
app.listen(PORT, () => {
    console.log(`Synchronize Token Pattern Demo Started On ` + PORT);
});



// Login Page Load
app.get('/',controller.getLogin);
// Validate Credentials
app.post('/home',controller.validateCredintial);
// Returns CSRF for the given Session ID
app.post('/tokens', controller.getCsrfToken);
// Submit Form Data
app.post('/posts', controller.submitPost);
// Signs out and clear the session ID with CSRF token
app.post('/logout', controller.logOut);

// When user exciplity load home page URL
app.get('/home', controller.home);

// When user exciplity load logout page URL
app.get('/logout', controller.logOut);
