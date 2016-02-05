var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var Users = require('./models/users.js');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

//CONFIG STUFF

//This was added from the https://github.com/ericf/express-handlebars under "Basic Usage"
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// This is for the body parser.  Not sure what it does, but Kyle says we need it.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//MongoDB Store - Session Persistance and password hashing, 9:45 video
var store = new MongoDBStore({ 
        uri: process.env.MONGO_URL,
        collection: 'sessions'
      });





//Here be dragons.  Nay, Express Session!

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  store: store
}));

app.use(function(req, res, next){
  console.log('req.session =', req.session);
  console.log('the userid is ', req.session.userId);
  if(req.session.userId){
    Users.findById(req.session.userId, function(err, user){
      if(!err){
        res.locals.currentUser = user;
      }
      next(); 
    });
  }else{
    next();
  }    
});



//End Express Session










app.get('/', function (req, res) {
  Users.count(function (err, users) {
    if (err){
      res.send('error getting users');
    }else{
      res.render('index', {
        userCount: users.length,
        currentUser: res.locals.currentUser
      });
    }
  });
});







//Here we create a controller to submit the code to the DB (2:09 from social todo handle submitted registration form video)
app.post('/user/register', function (req, res) {
  //Now we validate the password
  if(req.body.password !== req.body.password_confirmation){
    return res.render('index', {errors: "Password and password confirmation do not match.  Whoops!"});
    
  }
//End password validation
  
  
  
//Here is where we add new users!    
  
    var newUser = new Users();
    newUser.hashed_password = req.body.password;
    newUser.email = req.body.email;
    newUser.name = req.body.fl_name;
    newUser.save(function(err, user){
      if(err){
        res.render('index', {errors: err});
      }else{
        console.log('Added a new user ', user);
        req.session.userId = user._id;
        console.log('req.session.userId =', req.session.userId);
        res.redirect('/');
      }
    });    

    console.log('The User has the E-mail address', req.body.email);
});

//Begin Logout Handler

app.get('/user/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
  
})




//End Logout Handler.  Thanks for stopping by!





app.get('/', function (req, res) {
  res.send('Hello World, we have liftoffs!');
});


//Below, the process.env.PORT per Kyle is Node's way of pulling in environment variables.  See Video @ 9:41
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port' + process.env.PORT);
});