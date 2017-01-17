var app = require('express')(),
	port = process.env.port || 8080,
	morgan = require('morgan'),
	bodyParser = require('body-parser');

//configure

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
//authenticate
app.use(authenticate);

//404
app.use(function(req, res, next){
	res.status(404);
	res.sendFile(__dirname + "/404.html");
})
// set route
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res) {
	res.json({message : 'I am the about page'});
});

app.get('/contact', function(req, res) {
	res.sendFile(__dirname + '/contact.html');
});

app.post('/contact', function(req, res){
	console.log(req.body);
	res.send('Hello ' + req.body.name);
});

app.get('/@:username/:post_slug',checkName, function(req, res){
	console.log(req.params);
	//grab user profile
	//grab the post
	res.send('You are reading the post ' + req.params.post_slug+ ' by ' +req.params.username); 
});

function authenticate(req, res, next){
	console.log('Authenticating user');
	next();
}

function checkName(req, res, next){
	console.log(req.params);

	//validate the user
	//check database
	//var user = User.findOne({username: req.params.username});
	//if(! user)
	next();
}

// start the server
app.listen(port,function(){
	console.log('App is listning on http://localhost:' + port);
});