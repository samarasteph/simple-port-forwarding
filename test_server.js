
var net = require('net');
var process = require('process');

var server =  net.createServer(function (socket) { 
	console.log('connection to server'); 
	var buffer = Buffer.alloc(0);
	socket.on('data', function(data) { 
		
		var get_code = typeof data === 'string' ? (index) => data.charCodeAt(index) : (index) => data[index];
		console.log('incoming data',data,'length=',data.length,'type',typeof data);
		
		var send_ack = function (start,end){
			
			var data_to_send = data.slice(start,end);
			console.log('send data', buffer, data_to_send);

			socket.write('ACK: '); 
			socket.write(buffer);
			socket.write(data_to_send);
			
			buffer = Buffer.alloc(0);
		};
		
		var from = 0;
		var send = false;
		var i = 0;
		while( i < data.length ){
			var char_code = get_code(i);
			if (char_code == 13 || char_code == 10){
				send = true;
			}
			else{
				if (send){
					send_ack(from,i);
					send = false;
					from = i;
				}
			}
			i+=1;
		}
		if(send){
			send_ack(from,i);
			from = i;
		}
		buffer = Buffer.concat( [buffer, data.slice(from,i)] );
		console.log('End Data: buffered data[', buffer.length, ']');
	});
});

var port = 9090;

if(process.argv.length > 2){
	var nb = parseInt(process.argv[2]);
	if( !isNaN(nb) )
	{
		port = nb;
	}
}

process.on('exit', function() { server.close(); });

server.listen(port, function () { 
	console.log('server listening on port',  port, '...'); 
}); 