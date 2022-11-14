const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine','hbs')
app.set('views',path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tereza'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tereza',
        msg: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tereza',
        msg: 'MSG TEEESTE'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send([{ error: 'Address is required'  }])
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send([{ forecast: forecastData, location: location, address: req.query.address}])
             })
        })
    }
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Error',
        name: 'Tereza',
        msg: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'Error',
        name: 'Tereza',
        msg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is uo on port 3000')
})