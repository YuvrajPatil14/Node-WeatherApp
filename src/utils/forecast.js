const request = require("request");

const getData = (city , callback) => {
    console.log('called');
    
  const url = `https://api.openweathermap.org/da ta/2.5/weather?q=${city}&appid=db4c0c387a00a6b869d3aa06ff79cc92&units=metric`;
    if(!city )
    {
        return console.log('Provide arguments as city <space> country code');
        
    }
  request(
    {
      url,
      json: true,
    },
    (error, {body}) => {
      if (error) {
        callback("Something went wrong !! Try again", null);
      } else {
        if (body.cod === "404") {
          callback(body.message, null);
        } else {
            //console.log(body);
            
          callback(null, body);
        }
      }
    }
  );
};

module.exports = getData;


// getData(city,country,(error,data)=>{
//     if(error)
//     {
//       return console.log(error);
      
//     }
//     const dataw = data;
//     const city = dataw.name;
//     const temp = dataw.main.temp;
//     const weather = dataw.weather[0].main;
//     console.log(`Weather forecast for ${city} is ${temp} C and ${weather}`)
//   })