// Definition

const definition ={
    hook: "patient-view",
    description: "Mock CDS Service",
    id: "cds-service-starter-patient-view",
    prefetch: {
        patient: "Patient/{{context.patientId}}"
    }
}

//Handler

const handler =(req,res)=>{
    res.json({ 
        cards: [    
            {
            "uuid": "4e0a3a1e-3283-4575-ab82-028d55fe2719",
            "summary": "Example Card",
            "indicator": "info",
            "detail": "This is an example card.",
            "source": {
              "label": "Static CDS Service Example",
              "url": "https://example.com",
              "icon": "https://example.com/img/icon-100px.png"
            },
            "links": [
              {
                "label": "Google",
                "url": "https://google.com",
                "type": "absolute"
              },
              {
                "label": "Github",
                "url": "https://github.com",
                "type": "absolute"
              },
              {
                "label": "SMART Example App",
                "url": "https://smart.example.com/launch",
                "type": "smart",
                "appContext": "{\"session\":3456356,\"settings\":{\"module\":4235}}"
              }
            ]
          }
        ]
    })
}

module.exports ={ definition, handler};