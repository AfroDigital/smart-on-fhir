require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cdsServices = require('./discovery/cds-services');
const defaultCors = require('./middleware/default-cors');
const { logError, logRequest} = require('./middleware/error-handler');
const app = express();

app.use(bodyParser.json());
app.use(defaultCors);

app.set('json spaces', '  ');

app.get('/', (req, res) => {
    res.json({  service: process.env.SERVICE_NAME });
});

app.use('/cds-services',cdsServices);


app.use(logRequest);
app.use(logError);


app.listen(process.env.PORT,()=>{
    console.log(`${process.env.SERVICE_NAME} server running on port ${process.env.PORT}`)
})