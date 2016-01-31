var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World, we have liftoffs!');
});


//Below, the process.env.PORT per Kyle is Node's way of pulling in environment variables.  See Video @ 9:41
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port' + process.env.PORT);
});