var amqp = require('amqp');

var connection = amqp.createConnection({ host: 'localhost' });
connection.on('ready', function(){
	connection.publish('queue',JSON.stringify({inputFile:'b.flac'}));
});
