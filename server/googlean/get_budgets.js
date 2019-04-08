const moment = require('moment');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const axios = require('axios');


const csvWriter = createCsvWriter({
    header: ['DATE', 'BUDGET'],
    path: 'budgets.csv'
});

const viewId = "169170166"

async function get_budgets(req, res) {
    let start_date = moment('2019-02-01');
    let end_date = moment('2019-02-28');
    let tab_data = []
    
    for (let m = moment(start_date); m.isBefore(end_date); m.add(1, 'days')) {
        const {data} =  await axios.post("https://analyticsreporting.googleapis.com/v4/reports:batchGet", {
            "reportRequests": [{
                "viewId": viewId ,
                "metrics": [{
                    "expression": "ga:adCost"
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

        //console.log("reponse google budget", m.format('YYYY-MM-DD'));
        tab_data.push([m.format('YYYY-MM-DD'), data.reports[0].data.totals[0].values]);
    }

    csvWriter.writeRecords(tab_data)
    .then(() => {
      console.log('...Done');
    }); 
}

exports.get_budgets = get_budgets;