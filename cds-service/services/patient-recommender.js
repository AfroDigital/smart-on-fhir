const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const isDataAvailable = (patient) => {

  return patient.name && patient.name[0] && patient.name[0].given && patient.name[0].given[0];

}

const isValidPrefetch = (request) => {
  const data = request.body;

  if (!(data && data.prefetch && data.prefetch.patient)) {

    return false;

  }

  return isDataAvailable(data.prefetch.patient);
}

const retrievePatientResource =  (fhirServer, patientId, accessToken) => {

  const headers = { Accept: 'application/json+fhir' };

  if (accessToken) {

    headers.Authorization = `Bearer ${accessToken}`;

  }

  return axios({

    method: 'get',
    url: `${fhirServer}/Patient/${patientId}`,
    headers,

  }).then((result) => {

    if (result.data && isDataAvailable(result.data)) {    

        console.log(result.data);

        return result.data;
    }

    throw new Error();
  });
}

const buildCard = (patient) => {
  const name = patient.name[0].given[0];

  return {

    cards: [
        {
            summary: `Optum Recommendation for ${name} `,
            detail:  `This is a recommendation for  ${name} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit ligula non justo laoreet sodales. Sed accumsan sollicitudin sem, et porta justo. Nulla sed lectus tortor. Suspendisse luctus sem id tempus volutpat..`,
            indicator: "info",
            links: [
            {
                label: `Diabetes recommender for ${name}`,
                url : "https://afrodigital.github.io/launch.html",
                type: "smart"
            }
            ]
            }
    ],
  };
}

// CDS Service endpoint
router.post('/', (request, response) => {

  if (!isValidPrefetch(request)) {

    const { fhirServer, fhirAuthorization } = request.body;

    let patient;

    if (request.body.context) {

      patient = request.body.context.patientId;

    }

    if (fhirServer && patient) {

      let accessToken;

      if (fhirAuthorization && fhirAuthorization.access_token) {

        accessToken = fhirAuthorization.access_token;

      }

      retrievePatientResource(fhirServer, patient, accessToken)
        .then((result) => {

          response.json(buildCard(result));

        }).catch(() => {

          response.sendStatus(412);

        });

      return;
    }

    response.sendStatus(412);

    return;
  }
  
  const resource = request.body.prefetch.patient;

  response.json(buildCard(resource));
});

module.exports = router;
