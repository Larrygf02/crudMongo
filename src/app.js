const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')

//connect DB
mongoose.connect('mongodb://localhost/crud-mongo', {useNewUrlParser: true})
        .then(db => console.log('Db conectada'))
        .catch(err => console.log(err))

//routes
const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

//routes
app.use('/', indexRoutes)

//starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})