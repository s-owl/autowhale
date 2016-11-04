
// Import required modules
const fs = require('fs');

// Config file path
const configPath = 'config.example.json';
var configs;
var Dockerode = require('dockerode');
var docker = new Dockerode();


scaleServices();

function scaleServices(){
  loadConfig
    .then(getFilteredServices)
    .then()

}

var loadConfig = function(){
  return new new Promise(function(resolve, reject) {
    fs.readFile(configPath, (err, data)=>{
      if(err != undefined){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });
}

var getFilteredServices = function(configs){
  return new new Promise(function(resolve, reject) {
    // Get Available Docker Swarm Service List
    docker.listServices((err, services)=>{
      if(err != undefined){
        reject(err);
      }else{
        // Filter Services
        // Leave Only Configuered
        var configured = services.filter((service)=>{
          var isConfigured = configs.filter((config)=>{
            return config.name == service.Spec.Name;
          });
          return isConfigured.length == 1;
        });

        // Leave Only Replicated Services
        var replicated = configured.filter((service)=>{
          return service.Spec.Mode.Replicated != undefined;
        });

        resolve([replicated, configs]);
      }
    });
  });
}

function getByName() {

}
