const winston = require('winston');
const consoleTransport = new winston.transports.Console();
const options = {
  transports: [consoleTransport]
}

const logger = new winston.createLogger(options);

const logRequest = (req, resp, next) => {
  logger.info(req.url);
  next();
};


const logError = (err, req, resp, next) => {
  logger.error(err);
  next();
};

/* module.exports = (err, request, response, next) => {
    const status = err.status || 500;
    response.status(status);
    response.set('Content-Type', 'text/html');
    response.send(`${err.message}\n${err.stack}`);
  };
 */
 module.exports = { logRequest, logError};