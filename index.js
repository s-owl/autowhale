
// Import required modules
const fs = require('fs');

// Config file path
const configPath = 'config.example.json';
let configs;
const Dockerode = require('dockerode');
const docker = new Dockerode();


scaleServices();

function scaleServices(){
  loadConfig
    .then(getFilteredServices)
    .then()

}

const loadConfig = function(){
  return new Promise((resolve, reject)=>{
    fs.readFile(configPath, (err, data)=>{
      if(err != undefined){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
}

const getFilteredServices = function(configs){
  return new Promise((resolve, reject)=>{
    // Get Available Docker Swarm Service List
    docker.listServices((err, services)=>{
      if(err != undefined){
        reject(err);
      }else{
        // Filter Services
        // Leave Only Configuered
        let configured = services.filter((service)=>{
          let isConfigured = configs.filter((config)=>{
            return config.name == service.Spec.Name;
          });
          return isConfigured.length == 1;
        });

        // Leave Only Replicated Services
        let replicated = configured.filter((service)=>{
          return service.Spec.Mode.Replicated != undefined;
        });

        resolve([replicated, configs]);
      }
    });
  });
}

function getByName() {

}
