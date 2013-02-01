var handler = require('../encoding-handler'),
	fs = require('fs'),
	path = require('path');

describe('encoding-handler', function(){
	var outputFile = path.join('..','b.wav');
	beforeEach(function(){
		fs.exists(outputFile, function(exists){
			if(exists){
				fs.unlinkSync(outputFile);
			}
		});
	});

	it('should decode flac files', function(){
		handler.handleAssetReceived({inputFile:'b.flac'},function(){
			fs.exists(outputFile, function(exists){
				expect(exists).toBe(true);
			});
		});
	});
});
