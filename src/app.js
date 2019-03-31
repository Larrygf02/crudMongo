const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()

//routes

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middlewares
app.use(morgan('dev'))

//starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})