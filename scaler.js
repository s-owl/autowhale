const Dockerode = require('dockerode');
const docker = new Dockerode();

// UPSCALE a Service (n to n+1)
const upScale = function(serviceId){
  return new Promise((resolve, reject)=>{
    let service = docker.getService(serviceId);
    service.inspect((err, data)=>{
      const opts = {
        "Mode": {
          "Replicated": {
            "Replicas": data.Mode.Replicated.Replicas + 1
          }
        }
      };
      service.update(undefined, opts, (err, data)=>{
        if(err){
          reject(err);
        }else{
          resolve(data);
        }
      });
    });
  });
}

// DOWNSCALE a Service (n to n-1)
const downScale = function(serviceId){
  return new Promise((resolve, reject)=>{
    let service = docker.getService(serviceId);
    service.inspect((err, data)=>{
      const opts = {
        "Mode": {
          "Replicated": {
            "Replicas": data.Mode.Replicated.Replicas - 1
          }
        }
      };
      service.update(undefined, opts, (err, data)=>{
        if(err){
          reject(err);
        }else{
          resolve(data);
        }
      });
    });
  });
}
