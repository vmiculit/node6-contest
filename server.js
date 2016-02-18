// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs');

// Create an Express app object \\
var app = express();

app.use(logger('dev'));

// Parse URL's \\
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Create Storage Array

var videoData = []

// Load Default Videos

fs.readFile('./public/dogvideos.json', 'utf8', function(err, data){
	JSON.parse(data).forEach(function(item){
		videoData.push(item)
	})

})

// Routes \\

app.get('/', function(req, res){
	res.sendFile('index.html', {root : './public/html'})
})

app.get('/submit', function(req, res){
	if (videoData.length >= 8){
		res.sendFile('contestfull.html', {root : './public/html'})
	} else {
		res.sendFile('submit.html', {root : './public/html'}
	)}
})

app.post('/submit', function(req, res){

	var submittedItem = {
		name		: req.body.name,
		url			: req.body.videoUrl,
		title		: req.body.title,
		description	: req.body.description
	}

	videoData.push(submittedItem)

	res.redirect('/')

})

app.get('/view', function(req, res){
	res.sendFile('view.html', {root : './public/html'})
})

app.get('/winner', function(req, res){
	res.sendFile('winner.html', {root : './public/html'})
})

app.get('/videoData', function(req, res){
	res.send(videoData)
})

// Listen for connections \\
app.listen(3000, function(){
	console.log('Now serving hot app plates! Get yours before we run out!')
})
