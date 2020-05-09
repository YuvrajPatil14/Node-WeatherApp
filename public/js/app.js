

console.log('client side js is loded');

async function getData (city){

    msg1.textContent = "Loading...";
    msg2.textContent = '';
    const response = await fetch('/weather?city='+city);
    const data = await response.json();

    msg1.textContent = '';

    return data;
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')



weatherForm.addEventListener('submit',async (e)=>{
e.preventDefault();
const city = search.value
const data = await getData(city)

//console.log(data);
if(data.error)
{
    msg1.textContent = data.error + "Try again!!";
}
else{
    msg1.textContent = "Todays weather in " +data.city + "," + data.country ;
    msg2.textContent = "Temperature is "+ data.temp + ' cel and Prediction is ' + data.weather
}

})
