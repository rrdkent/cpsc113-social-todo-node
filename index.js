var express = require('express');
var exphbs = require('express-handlebars');
var app = express();


//This was added from the https://github.com/ericf/express-handlebars under "Basic Usage"
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index');
});


app.get('/', function (req, res) {
  res.send('Hello World, we have liftoffs!');
});


//Below, the process.env.PORT per Kyle is Node's way of pulling in environment variables.  See Video @ 9:41
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port' + process.env.PORT);
});