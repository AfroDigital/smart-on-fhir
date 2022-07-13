const express = require('express');

const router = express.Router();
const serviceDefinitions = require('./service-definitions');
const patientRecommenderService = require('../services/patient-recommender');

// Discovery Endpoint
router.get('/', (request, response) => {
  const discoveryEndpointServices = {
    services: serviceDefinitions,
  };
  response.json(discoveryEndpointServices);
});

// Routes to patient-recommender CDS Service

router.use('/patient-recommender', patientRecommenderService);

module.exports = router;
