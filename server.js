var express           = require('express');
var expressHandlebars = require('express-handlebars');
var session           = require('express-session');
var Sequelize         = require('sequelize');
var passport          = require('passport');
var passportLocal     = require('passport-local');
var bcrypt            = require('bcryptjs');
var bodyParser        = require('body-parser');
var app               = express();

var PORT = process.env.PORT || 3000;
var sequelize = new Sequelize('test', 'root');

//SETS UP HANDLEBARs LAYOUTS
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//ADD BODYPARSER TO READ HTML
app.use(bodyParser.urlencoded({
	extended: false
}));

//ACCESS TO PUBLIC FOLDER
app.use('/static', express.static('public'));

//CREATING SECRET FOR USER LOGIN
// app.use(require('express-session')({
//     secret: 'mqCJYnXWUrrb8y8FzoKqcXm0GcMygqDd7seYntmg',
//     resave: true,
//     saveUninitialized: true,
//     cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
// }));

/*----------------------------------------
PASSPORT - AUTHENTICATION
----------------------------------------*/
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new passportLocal.Strategy(function(username, password, done) {
//   //CHECKING PASSWORD IN DB
//   Student_information.findOne({
//     where: {
//       email: email
//   }
// }).then(function(user) {
//   //CHECKING PASSWORD AGAISNT HASH
//   if(user){
//     bcrypt.compare(password, user.dataValues.password, function(err, user) {
//       if (Student_information) {
//         //if password is correct authenticate the user with cookie
//         done(null, { id: email, email: email });
//         } else{
//           done(null, null);
//         }
//       });
//     } else {
//       done(null, null);
//     }
//   });
// }));
// // CHANGES THE OBJECT USED TO AUTHENTICATE TO SMALLER TOKEN. PROTECTS THE SERVER FROM ATTACKS.
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//     done(null, { id: id, username: id })
// });

/*----------------------------------------
MODEL
----------------------------------------*/

/*----------------------------------------
ROUTES
----------------------------------------*/
//HOMEPAGE
app.get('/', function(req, res) {
	res.render('index');
});
//ABOUT ME PAGE
app.get('/about_me', function(req, res) {
	res.render('aboutme');
});




/*----------------------------------------
DATABASE CONNECTION VIA SEQUELIZE
----------------------------------------*/
sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("Listening on PORT %s", PORT);
	});
})