const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');
const app = express();
const moment = require('moment');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
    header: ['DATE', 'NB_SESSION'],
    path: 'data.csv'
});

app.use(cors())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  let viewId = "169170166"

  var urlencodedParser = bodyParser.urlencoded({
    extended: true
  });
  app.use(urlencodedParser);
  app.use(bodyParser.json());

app.post('/test', googlea);


async function googlea(req, res) {
    let start_date = moment('2019-01-01');
    let end_date = moment('2019-04-03');
    let tab_data = []
    console.log(typeof(start_date));
    console.log(start_date.format('YYYY-MM-DD'))
   for (let m = moment(start_date); m.isBefore(end_date); m.add(1, 'days')) {
        const {data} =  await axios.post("https://analyticsreporting.googleapis.com/v4/reports:batchGet", {
            "reportRequests": [{
                "viewId": viewId ,
                "metrics": [{
                    "expression": "ga:sessions"
                }], 
                "dateRanges" : [{
                    "startDate" : m.format('YYYY-MM-DD'),
                    "endDate" : m.format('YYYY-MM-DD')
                }]
            }]
        },{
        headers: {
        Authorization: `Bearer ${req.body.data.Zi.access_token}`
        }})
        console.log("reponse google");
        values = data.reports[0].data.totals[0].values
        tab_data.push([m.format('YYYY-MM-DD'), values]);
    }
    csvWriter.writeRecords(tab_data)
    .then(() => {
        console.log('...Done');
    }); 
}
const port = 5000;

app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
});

