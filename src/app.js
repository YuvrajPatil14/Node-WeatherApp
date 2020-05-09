const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getData = require('./utils/forecast')

const app = express();

const port = process.env.PORT || 3000

//Define paths for config
const publicDirPath = path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//handlebar setup enigin and view location
app.set('view engine','hbs') 
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)
//static dir to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'dev'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'dev'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        help:'Yet to add',
        title:'Help',
        name:'dev'
    })
})
app.get('/weather',(req,res)=>{
    
    
    if(!req.query.city ){
        
        
       return res.send({
            error: 'Please Provide real city name'
        })
    }
    getData(req.query.city ,(error,data)=>{
        if(error)
        {
            return res.send({
                error
            })
          
        }
        const dataw = data;
        const city = dataw.name;
        const temp = dataw.main.temp;
        const weather = dataw.weather[0].description;
        const country = dataw.sys.country
        const location = dataw.coord
        res.send({
            country,city,temp,weather,location
        })
        //console.log(`Weather forecast for ${city} is ${temp} C and ${weather}`)
      })
   
})
app.get('/products',(req,res)=>{
   if(!req.query.search){
       return res.send({
            error:'No search term !!'
        })
   }
    
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:'Help not found',
        name:'dev'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        error:'404 !!! Page not Found',
        name:'dev'
    })
})
app.listen(port,()=>{
    console.log('sever is up on port '+port);
    
})