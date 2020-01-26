var net = require('net');
var process = require('process');

var from = 8080;
var to = 9090;
var prev_arg = '';

const from_arg = '--from';
const to_arg = '--to';


process.argv.forEach( function(val,index) {
	if ( val === from_arg ) {
		prev_arg = from_arg;
	}
	else if ( val === to_arg ) {
		prev_arg = to_arg;
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
	console.log("incomming connection port", from);
	
	var forward_socket = net.createConnection({port: to}, function(){
		console.log("connected to localhost on port", to);
		from_socket.pipe( forward_socket );
		forward_socket.pipe( from_socket );
	});
		
	forward_socket.on('error', function(err) {
		console.error(err);
		process.exit();
	});

}).on('error', function (err) {
	console.error(err);
	process.exit();
});

process.on('exit', function () {
	server.close();
});
	
server.listen( from, function ()  {
	console.log('listen on', server.address());
});

