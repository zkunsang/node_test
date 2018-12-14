var fs = require('fs');

function cascade( callbacks, callback ) {
	var functions = callbacks.slice();

	function processNext(err) {
		if ( err ) {
			return callback(err);
		}
		
		var args = Array.prototype.slice.call(arguments);
		
		var func = functions.shift();

		if ( func ) {
			args.shift();
		}
		else {
			func = callback;
		}

		args.push( processNext );
		func.apply( this, args );
	}

	var args = Array.prototype.slice.call(arguments);
}
