var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var users = require('./routes/users');

var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('localhost:27017/node-angular2');


//View Engine
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
//Set Static Folder
var staticFilesPath = express.static(path.join(__dirname, 'client'));
app.use(staticFilesPath);


//Body Parse MD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);
app.use('/users', users);


app.listen(port, function () {
    console.log('server started on port ' + port);
})

