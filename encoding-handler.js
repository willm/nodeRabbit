var spawn = require('child_process').spawn,
	err;

var sendError = function(){
	console.log('oh no');
}

exports.handleAssetReceived = function(msg,cb){
	var ffmpeg = spawn('/usr/bin/ffmpeg', 
		['-y',
		'-i',
		msg.inputFile, 
		msg.inputFile.replace('.flac', '.wav')]);

	ffmpeg.on('exit', function(code){
		console.log(err);
		if(code === 0){
			console.log('success !!');
		}
		else{
			sendError();
		}
		if(cb)
			cb();
	});
	
	ffmpeg.stderr.setEncoding('utf-8');
	ffmpeg.stderr.on('data',function(data){
		err += data;
	});
};
