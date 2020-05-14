const compression = require('compression')
const express = require('express');
const path = require('path');

const app = express();
/*
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header('Cache-Control', 'max-age=0,no-cache,no-store,post-check=0,pre-check=0,must-revalidate');
    res.header('Expires', '-1');
    next();
    
});
*/

app.use(compression())

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);
