
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, cons = require('consolidate')
	, io = require('socket.io')
	, conf = require('./config.js');

var app = express();

app.configure(function(){
	app.set('port', conf.port || process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'mustache');
	app.set('host', conf.host);

	app.engine('mustache', cons.mustache);

	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.logger('dev'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', function(req, res){

	console.log( req.headers['user-agent'] );

	res.set('Content-Type', 'text/html; charset=utf-8');

	res.render('multitacz', {
	'connection': {
			'host': app.get('host'),
			'port': app.get('port')
		}
	});

});

app.get( '/reveal', function( req, res ){

	console.log( req.headers['user-agent'] );

	res.set('Content-Type', 'text/html; charset=utf-8');

	res.render('reveal', {
	'connection': {
			'host': app.get('host'),
			'port': app.get('port')
		}
	});

});

var httpServer = http.createServer(app).listen(app.get('port'), app.get('host'), function (){

	console.log("Express server listening on: " + app.get('host') +':'+ app.get('port'));

});

var websocket = io.listen( httpServer, {'log': false, 'transports': ['websocket']} );

websocket.sockets.on('connection', function (socket) {

	socket.on('event_data', function (data) {

		console.log('deviceOnMove: ', data);
		socket.broadcast.emit( 'deviceOnMove', data);

	});
});
