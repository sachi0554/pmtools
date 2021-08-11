export const getProject = () => {
    return fetch("http://127.0.0.1:8000/api/project/list", {
        "method": "GET",
        "headers": {
          "Content-type": "Application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNhY2hpQGdtYWlsLmNvbSIsImV4cCI6MTY1OTQ1MDg1NSwiZW1haWwiOiJzYWNoaUBnbWFpbC5jb20iLCJvcmlnX2lhdCI6MTYyODY5MjQ1NX0.Knzq4XkVkLFh-2QiY8Ve8K2yHZFsD069cC4MlL_DbiE"
        }
      })
      .then(response => {return response.json()})
      .catch(err => { console.log(err); 
      });
    
  };

