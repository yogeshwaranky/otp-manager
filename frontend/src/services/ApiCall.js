import axios from "axios";

export const commonrequest = async(methods,url,body,header)=>{
    let config ={
        method:methods,
        url,
        headers:header ? header:{
            "Content-Type":"application/json"
        },
        data:body
    }

    //axios instance

    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })
}

const token = 'your_authentication_token'; // Replace with your actual token

fetch('/api/protected-route', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  },
})
  .then(response => response.json())
  .then(data => {
    // Handle the data
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });

