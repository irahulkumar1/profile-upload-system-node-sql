var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    fileUpload = require('express-fileupload'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require("body-parser");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'profile_mage'
});



connection.connect();

global.db = connection;


//all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

//development only

app.get('/', routes.index);
app.post('/', routes.index);
// app.get('/profile/', routes.index);
//Middleware
app.listen(8080)