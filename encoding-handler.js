var spawn = require('child_process').spawn,
	path = require('path');

var sendError = function(){
	console.log('oh no');
}

var decodeFlac = function(inputFile){
	var err ='';
	var ffmpeg = spawn('/usr/bin/ffmpeg', 
		['-y',
		'-i',
		inputFile, 
		inputFile.replace('.flac', '.wav')]);

	ffmpeg.on('exit', function(code){
		console.log(err);
		if(code === 0){
			console.log('success !!');
		}
		else{
			sendError();
		}
	});
	
	ffmpeg.stderr.setEncoding('utf-8');
	ffmpeg.stderr.on('data',function(data){
		err += data;
	});
}

exports.handleAssetReceived = function(msg,cb){
	if(path.extname(msg.inputFile) === '.flac')
		decodeFlac(msg.inputFile);	
	if(cb)
		cb();
};
