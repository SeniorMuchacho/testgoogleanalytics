const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const sessions = require('./googlean/get_sessions')
const engagment = require('./googlean/get_engagment')
const prospect = require('./googlean/get_prospect')
const app = express();

app.use(cors())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  var urlencodedParser = bodyParser.urlencoded({
    extended: true
  });
  app.use(urlencodedParser);
  app.use(bodyParser.json());

app.post('/googleanalytique', googleana);
app.post('/googleads', googleads);

function googleana(req, res) {
    sessions.get_sessions(req, res);
    //prospect.get_prospects(req, res);
    engagment.get_engagments(req, res);
}

const port = 5000;
app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
});

