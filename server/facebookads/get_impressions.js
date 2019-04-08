const moment = require('moment');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const axios = require('axios');


const csvWriter = createCsvWriter({
    header: ['DATE', 'IMPRESSION'],
    path: 'nb_of_impression_facebookads.csv'
});


async function get_impressions(req, res) {
    let start_date = moment('2018-01-01');
    let end_date = moment('2019-04-03');
    let tab_data = []


    console.log(req.body);
    //console.log(req.body);
    /*for (let m = moment(start_date);// m.isBefore(end_date); m.add(1, 'days')) {*/
      //}
    /*csvWriter.writeRecords(tab_data)
    .then(() => {
      console.log('...Done');
    });*/
}

exports.get_impressions = get_impressions;