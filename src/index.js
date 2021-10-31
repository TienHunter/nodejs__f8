const path = require('path');
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const app = express()
const port = 3000

const route = require('./routes/index')
const apiRouter = require('./routes/api')
// const connection = require('./config/db/index')
//static files in express
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
   extended: true
}))
app.use(express.json())

// HTTP logger
// app.use(morgan('combined'))

// template engine
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);
apiRouter(app);

// route api

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
});