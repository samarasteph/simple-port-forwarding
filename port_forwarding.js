var net = require('net');
var process = require('process');

var from = 8080;
var to = 9090;
var log = false;
var prev_arg = '';

const from_arg = '--from';
const to_arg = '--to';
const log_arg = '--log';


process.argv.forEach( function(val,index) {
	if ( val === from_arg ) {
		prev_arg = from_arg;
	}
	else if ( val === to_arg ) {
		prev_arg = to_arg;
	}
	else if( val === log_arg ) {
		log = true;
	}
	else if (prev_arg === from_arg){
		let nb = parseInt(val);
		if (!isNaN(nb)){
			from = nb;
		}
		else prev_arg = '';
	}
	else if (prev_arg === to_arg) {
		let nb = parseInt(val);
		if (!isNaN(nb)){
			to = nb;
		}
		else prev_arg = '';
	}
});

var server  = net.createServer( function (from_socket) {
	
	var signature = Math.floor(Math.random() * Math.floor(500000));
	
	console.log(signature, "incomming connection port", from);
	
	from_socket.on('error', function(err) {
		console.error(signature, 'Incoming socket error');
		console.error(err);
	});
	if (log){
		from_socket.on('data', function(data) {
			console.log(signature, '<=====', data.toString());
		});
	}
	var forward_socket = net.createConnection({port: to}, function(){
		console.log(signature, "connected to localhost on port", to);
		from_socket.pipe( forward_socket );
		forward_socket.pipe( from_socket );
	});
		
	if (log){
		forward_socket.on('data', function(data){
			console.log(signature, "=====>", data.toString());
		});
	}

	forward_socket.on('error', function(err) {
		console.error(signature, "Forward socket Error");
		console.error(err);
		process.exit();
	});

}).on('error', function (err) {
	console.error('Server Error');
	console.error(err);
	process.exit();
});

process.on('exit', function () {
	server.close();
});
	
server.listen( from, function ()  {
	console.log('listen on', server.address());
});

