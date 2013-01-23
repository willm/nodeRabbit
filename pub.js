var amqp = require('amqp');

var connection = amqp.createConnection({ host: 'localhost' });
connection.on('ready', function(){
	setInterval(function(){connection.publish('my-queue',new Date().toString())},10);
});
