require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston')

const consoleTransport = new winston.transports.Console();

const myWinstonOptions = {
    transports: [consoleTransport],

};

const logger = new winston.createLogger(myWinstonOptions);

function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}

function logError(err, req, res, next) {
    logger.error(err)
    next()
}


const { definition, handler} = require('./patient-view-handler');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(logRequest)

app.use(logError);

//Discovery

app.get('/', function(req, res){
    res.json({  service: process.env.SERVICE_NAME });
});

app.get('/cds-services', function(req, res){
    res.json({ 
         services: [definition]
        });
});

app.post(`/cds-services/${definition.id}`,handler);




// Register CDS Service endpoints


app.listen(process.env.PORT,()=>{
    console.log(`${process.env.SERVICE_NAME} server running on port ${process.env.PORT}`)
})