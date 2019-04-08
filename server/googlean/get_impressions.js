const moment = require('moment');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const axios = require('axios');


const csvWriter = createCsvWriter({
    header: ['DATE', 'NB_OF_IMPRESSION'],
    path: 'nb_of_impression.csv'
});

const viewId = "169170166"

async function get_impressions(req, res) {
    let start_date = moment('2019-02-01');
    let end_date = moment('2019-02-28');
    let tab_data = []
    
    for (let m = moment(start_date); m.isBefore(end_date); m.add(1, 'days')) {
        const {data} =  await axios.post("https://analyticsreporting.googleapis.com/v4/reports:batchGet", {
            "reportRequests": [{
                "viewId": viewId ,
                "metrics": [{
                    "expression": "ga:impressions"
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

        //console.log("reponse google impression", m.format('YYYY-MM-DD'));
        tab_data.push([m.format('YYYY-MM-DD'), data.reports[0].data.totals[0].values]);
    }

    csvWriter.writeRecords(tab_data)
    .then(() => {
      console.log('...Done');
    }); 
}

exports.get_impressions = get_impressions;