// Place your server entry point code here
// import minimist from 'minimist';
// // import express from 'express';
// const express = require('express');
// import fs from 'fs';
// import morgan from 'morgan';
// import {db} from './src/services/database.js';
// import { coinFlip, coinFlips, countFlips, flipACoin } from './coin.mjs';
const minimist = require('minimist');
const express = require('express');
const morgan = require('morgan');
const db = require('./src/services/database.js');
const fs = require('fs');
const req = require('express/lib/request');

const app = express()


// Make Express use its own built-in body parser for both urlencoded and JSON body data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const args = minimist(process.argv.slice(2));
const port = args.port || process.env.PORT || 5555;
const debug = args.debug || false;
const log = args.log || true;

console.log(args)
//help message
if (args.help || args.h) {
    console.log(`
    server.js [options]
    --port	Set the port number for the server to listen on. Must be an integer
                between 1 and 65535.

    --debug	If set to true, creates endlpoints /app/log/access/ which returns
                a JSON access log from the database and /app/error which throws 
                an error with the message "Error test successful." Defaults to 
                false.

    --log		If set to false, no log files are written. Defaults to true.
                Logs are always written to database.

    --help	Return this message and exit.
    `)
    process.exit(0)
}


const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port));
})

// Logging middleware
app.use((req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }
    const stmt = db.prepare(`INSERT INTO accesslog (remoteaddr, remoteuser, time, 
        method, url, protocol, httpversion, status, referer, useragent) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`)

    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time,
        logdata.method, logdata.url, logdata.protocol,
        logdata.httpversion, logdata.status,
        logdata.referer, logdata.useragent)
    next()

})

if(debug) {
    app.get('/app/log/access', (req, res) => {
        const stmt = db.prepare('SELECT * FROM accesslog').all();
        res.status(200).json(stmt);
    });

    app.get('/app/error', (req, res, next) => {
        throw new Error('Error test successful');
    });
}

if (log !== 'false') {
    const accesslog = fs.createWriteStream('access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: accesslog }))
}


app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({'flip': flip})
})


app.get('/app/', (req, res) => {
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})





app.get('/app/flips/:number',(req, res) => {
    var result = coinFlips(req.params.number)
    var count = countFlips(result)
    res.status(200).json({ 
        'raw': result, 
        'summary': count
    })
})

app.get('/app/flip/call/heads',(req, res) => {
    res.status(200).json(flipACoin('heads'))
})

app.get('/app/flip/call/tails',(req, res) => {
    res.status(200).json(flipACoin('tails'))
})


app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type("text/plain")
})

