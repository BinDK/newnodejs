const path = require('path');
const express = require('express');
const app = express();
const handelbars = require('express-handlebars');
const morgan = require('morgan');
const { extname } = require('path');
const port = 3000;


//liveReload
const livereload = require('livereload');
const connect_livereload = require('connect-livereload');
var livereloadServer = livereload.createServer();
const publicRefresh = path.join(__dirname, 'public');
livereloadServer.watch(publicRefresh);
livereloadServer.server.once("connection", () =>{
  setTimeout(() => {
livereloadServer.refresh("/");
  }, 10);
});
app.use(connect_livereload());

//Đọc mọi file/ hình trong folder public
// app.use(express.static(path.join(__dirname, 'public')));

// hoặc Dùng command dưới để xài live-reload, 
app.use(express.static(publicRefresh));

// Middleware
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//HTTP logger
// app.use(morgan('combined'))

//Template engine
app.engine('hbs', handelbars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'))

// console.log('Path: ', path.join(__dirname, 'resource/views'));
app.get('/', (req, res) => {
  res.render('home')
})
app.get('/news', (req, res) => {
	console.log(req.query.searchthis);
  res.render('news');
})


app.get('/search', (req, res) => {
  res.render('search')
})

app.post('/search', (req, res) => {
  console.log(req.body);

  res.send();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})