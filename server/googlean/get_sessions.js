const moment = require('moment');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const axios = require('axios');


const csvWriter = createCsvWriter({
    header: ['DATE', 'NB_SESSION'],
    path: 'nb_of_sessions.csv'
});


const viewId = "169170166"

async function get_sessions(req, res) {
    let start_date = moment('2018-01-01');
    let end_date = moment('2019-04-03');
    let tab_data = []
    
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
        tab_data.push([m.format('YYYY-MM-DD'), data.reports[0].data.totals[0].values]);
        console.log(tab_data);
    }
    csvWriter.writeRecords(tab_data)
    .then(() => {
        console.log('...Done');
    }); 
}

exports.get_sessions = get_sessions;