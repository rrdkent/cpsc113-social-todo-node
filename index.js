var express = require('express');
var exphbs = require('express-handlebars');
var app = express();


//CONFIG STUFF

//This was added from the https://github.com/ericf/express-handlebars under "Basic Usage"
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// This is for the body parser.  Not sure what it does, but Kyle says we need it.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.get('/', function (req, res) {
    res.render('index');
});


//Here we create a controller to submit the code to the DB (2:09 from social todo handle submitted registration form video)
app.post('/user/register', function (req, res) {
    res.send(req.body);
    console.log('The User has the E-mail address', req.body.email);
});


app.get('/', function (req, res) {
  res.send('Hello World, we have liftoffs!');
});


//Below, the process.env.PORT per Kyle is Node's way of pulling in environment variables.  See Video @ 9:41
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port' + process.env.PORT);
});