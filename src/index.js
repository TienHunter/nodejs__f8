const path = require('path');
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const app = express()
const port = 3000
//static files in express
app.use(express.static(path.join(__dirname, 'public')))
// HTTP logger
app.use(morgan('combined'))

// template engine
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'));
app.get('/news', (req, res) => {
   res.render('news');
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})