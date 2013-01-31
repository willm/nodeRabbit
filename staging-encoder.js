var amqp = require('amqp'),
	server = 'localhost',
	qName = 'queue',
	connection = amqp.createConnection({ host: server }),
	handler = require('./encoding-handler');

connection.on('ready', function () {
	console.log('listening for messages on ' + server + ' from ' + qName + ' queue');
	connection.queue(qName, function(q){
		// Catch all messages
		q.bind('#');
		// Receive messages
		q.subscribe(function (message) {
		 // Print messages to stdout
			console.log(message.data.toString('utf8'));
			handler.handleAssetReceived(JSON.parse(message.data));
		});
	});
});
