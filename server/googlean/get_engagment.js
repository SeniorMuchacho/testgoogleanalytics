const moment = require('moment');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const axios = require('axios');


const csvWriter = createCsvWriter({
    header: ['DATE', 'NB_ENGAGEMENTS - 10', 'NB_ENGAGEMENTS  10-59' , 'NB_ENGAGEMENTS + 60'],
    path: 'nb_of_engagements.csv'
});

const viewId = "169170166"

async function get_engagments(req, res) {
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
                }],
                "dimensions": [{
                      "name": "ga:sessionDurationBucket",
                      "histogramBuckets": ["10","60"]
                    }]
            }]
        },{
        headers: {
        Authorization: `Bearer ${req.body.data.Zi.access_token}`
        }})

        console.log("reponse google engagment", m.format('YYYY-MM-DD'));
        if (!data.reports[0].data.hasOwnProperty("rows")) {
            tab_data.push([m.format('YYYY-MM-DD'), 0, 0, 0]);
        }
        else {
            if (Object.keys(data.reports[0].data.rows).length == 1) {
                tab_data.push([m.format('YYYY-MM-DD'), 0, data.reports[0].data.rows[0].metrics[0].values, 0]);
            }
            else if  (Object.keys(data.reports[0].data.rows).length == 2) {
                tab_data.push([m.format('YYYY-MM-DD'),data.reports[0].data.rows[1].metrics[0].values, data.reports[0].data.rows[0].metrics[0].values, 0]);
            }
            else{
                tab_data.push([m.format('YYYY-MM-DD'),data.reports[0].data.rows[0].metrics[0].values, data.reports[0].data.rows[1].metrics[0].values, data.reports[0].data.rows[2].metrics[0].values]);
            }
        }
    }

    csvWriter.writeRecords(tab_data)
    .then(() => {
      console.log('...Done');
    }); 
}

exports.get_engagments = get_engagments;