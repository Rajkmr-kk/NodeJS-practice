const express = require('express')
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars')
const members = require('./Members')

const app = express()

// Custom middleware
app.use(logger)

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Setting static folder
app.use(express.static('public'))

// Homepage route
app.get('/', (req, res) =>{
    res.render('index', {
        title: 'Member App',
        members
    })
})

// Members API route
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}/`))