const fs = require('fs');
const moment = require('moment');

const change = (log, req, time, action) => {
    let newLog = {
        product: req.body,
        timeChange: time,
        action: action
    };
    log.push(newLog);
    return JSON.stringify(log, null, 4);
};

let statsLog = (req, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let newLog = change(JSON.parse(data), req, moment().format('MMMM Do YYYY, h:mm:ss a'), action);
            fs.writeFile(file, newLog, err => {
                if (err) {
                    console.log(err);
                } 
            });
        }
    });
    

    // console.log(req.body, moment().format('MMMM Do YYYY, h:mm:ss a'), action);
}

module.exports = statsLog;