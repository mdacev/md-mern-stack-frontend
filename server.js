const compression = require('compression')
const express = require('express');
const path = require('path');

const app = express();
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_API}`
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(compression())

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);
