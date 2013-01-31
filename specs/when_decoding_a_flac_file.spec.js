var handler = require('../encoding-handler'),
	fs = require('fs');

describe('encoding-handler', function(){
	var outputFile = '../b.wav';
	beforeEach(function(){
		fs.exists(outputFile, function(exists){
			if(exists){
				fs.unlinkSync(outputFile);
			}
		});
	});

	it('should be true', function(){
		handler.handleAssetReceived({inputFile:'b.flac'},function(){
			fs.exists(outputFile, function(exists){
				expect(exists).toBe(true);
			});
		});
	});
});
