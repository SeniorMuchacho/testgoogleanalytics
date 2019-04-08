const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

//      import for google  analytics            //
const sessions = require('./googlean/get_sessions')
const engagment = require('./googlean/get_engagment')
const impressions = require('./googlean/get_impressions')
const budgets = require('./googlean/get_budgets')

//      import for google ads                  //
const impressionsgads = require('./googleads/get_impressions')

//      import  for facebook ads                  //
const impressionsface = require('./facebookads/get_impressions')


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
app.post('/facebookads', facebookads);


function facebookads(req, res) {
  impressionsface.get_impressions(req, res)

}


function googleads(req, res) {
  impressionsgads.get_impressions(req, res)

}

function googleana(req, res) {
    sessions.get_sessions(req, res);
    impressions.get_impressions(req, res);
    budgets.get_budgets(req, res);
    engagment.get_engagments(req, res);
}

const port = 5000;
app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
});

