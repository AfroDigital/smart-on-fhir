  function App(client) {
    this.client = client;
    this.patient;
    this.observations;
  }
  
  App.prototype.fetchCurrentPatient = function() {
    this.client.patient.read().then((data)=>{
      this.patient = data;
      renderPatient(this.patient);
      this.fetchCurrentObservations();
     // console.log(this.patient);
    });
  };


  App.prototype.fetchCurrentObservations = function() {

    this.client.encounter.read().then((data)=>{  
      console.log(this.data);
    });
  };

  App.prototype.request = function(requestOptions, fhirOptions) {
    this.client.request(requestOptions, fhirOptions).then((data)=>{
      console.log(data);
  });
  };
  
  App.prototype.renderContext = function() {
    return Promise.all([
      this.fetchCurrentPatient(),
      //this.fetchCurrentObservations(),
      //this.fetchCurrentEncounter()
    ]);
  };
  

  function renderPatient(patient){
    const patientHTML = `<div class="w-100 d-flex flex-column p-5 justify-content-start">
              <h1>Current Patient</h1>
              <h4>Name: ${patient.name[0].given}  ${patient.name[0].family}</h4>
              <h4>Gender: ${patient.gender}</h4>
              <h4>${patient.birthDate}</h4>
            </div>`;

    document.getElementById("patient").innerHTML = patientHTML;
  }
 