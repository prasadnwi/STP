const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

// JS Object to store Session IDs with CSRF tokens
const SESSION_IDS = {};

/*
get login
 */
exports.getLogin = (req, res) => {

    const sessionID = req.cookies['session-id'];

    if (sessionID && SESSION_IDS[sessionID]) {

        res.sendFile('pages/form.html', {root: __dirname});

    } else {

        res.sendFile('pages/login.html', {root: __dirname});
    }
}

/*
validate credential
 */
exports.validateCredintial = (req, res) => {

    if (req.body.inputUsername === 'admin' && req.body.inputPassword === 'root') {


        // Generating Session ID and Token
        const SESSION_ID = uuidv1();
        const CSRF_TOKEN = uuidv4();


        // Saving token
        SESSION_IDS[SESSION_ID] = CSRF_TOKEN;

        // Setting Cookie
        res.setHeader('Set-Cookie', [`session-id=${SESSION_ID}`, `time=${Date.now()}`]);

        res.sendFile('pages/form.html', {root: __dirname});

    } else {

        const error = {status: 401, message: 'Invalid Credentials'};
        res.sendFile('pages/form-error.html', {root: __dirname});
    }
}

/*
get CSRF
 */
exports.getCsrfToken = (req, res) => {

    const sessionID = req.cookies['session-id'];

    if (SESSION_IDS[sessionID]) {

        const response = {token: SESSION_IDS[sessionID]};
        res.json(response);

    } else {

        const error = {status: 400, message: 'Invalid Session ID'};
        res.status(400).json(error)
    }
}

/*
submit post
 */
exports.submitPost = (req, res) => {

    const inputToken = req.body.inputToken;
    const sessionID = req.cookies['session-id'];

    // Checking if Session ID matches CSRF Cookie
    if (SESSION_IDS[sessionID] && SESSION_IDS[sessionID] === inputToken) {

        res.sendFile('pages/form-success.html', {root: __dirname});

    } else {

        res.sendFile('pages/form-error.html', {root: __dirname});
    }
}

/*
log out
 */
exports.logOut = (req, res) => {

    const sessionID = req.cookies['session-id'];
    delete SESSION_IDS[sessionID];


    res.clearCookie("session-id");
    res.clearCookie("time");

    res.sendFile('pages/login.html', {root: __dirname});
}

/*
 load home page
 */
exports.home = (req, res) => {

    const sessionID = req.cookies['session-id'];

    if (sessionID && SESSION_IDS[sessionID]) {

        res.sendFile('pages/form.html', {root: __dirname});

    } else {

        res.sendFile('pages/login.html', {root: __dirname});
    }
}

/*
log out
 */
exports.logOut = (req, res) => {

    res.redirect('/');
}