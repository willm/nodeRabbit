var spawn = require('child_process').spawn,
	config = require('./config.json'),
	path = require('path')
	senderNode = require('./sender_node');

var sendError = function(err){
	senderNode.sendMessage('decoding error ' + err);
}

var sendAssetReady = function(msg){
	senderNode.sendMessage('asset ready! ' + msg);
}

var decodeFlac = function(inputFile, success, error){
	var err ='';
	var ffmpeg = spawn(config.path_to_ffmpeg,
		['-y',
		'-i',
		inputFile, 
		inputFile.replace('.flac', '.wav')]);

	ffmpeg.on('exit', function(code){
		if(code === 0){
			success(inputFile);
		}
		else{
			error(err);
		}
	});
	
	ffmpeg.stderr.setEncoding('utf-8');
	ffmpeg.stderr.on('data',function(data){
		err += data;
	});
}

exports.handleAssetReceived = function(msg,cb){
	var callback = function(){
		if(cb)
			cb();
	};
	if(path.extname(msg.inputFile) === '.flac'){
		decodeFlac(msg.inputFile, sendAssetReady, sendError);
		callback();
		return;
	}
	sendAssetReady(msg);
	callback();
};
