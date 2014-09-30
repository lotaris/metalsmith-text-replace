"use strict";

var match = require('minimatch');
var debug = require('debug')('metalsmith-text-replace');

module.exports = function(opts) {

	opts = normalize(opts);

	return function(files, metalsmith, done) {

		// for each file
		Object.keys(files).forEach(function(filename) {
			var file = files[filename];

			// for each pattern
			Object.keys(opts).forEach(function(pattern) {

				// if the file matches the pattern
				if (pattern !== 'options' && match(filename, pattern, opts.options)) {

					debug('Applying text-replace to "%s"...', filename);
					var repl = opts[pattern];

					if (Array.isArray(repl)) {
						for (var i = 0; i < repl.length; i++) {
							replace(file, repl[i]);
						}
					} else {
						replace(file, repl);
					}
				}
			});
		});
		done();
	};
};


function replace(file, repl) {
	if (!repl.find) {
		throw new Error('Must provide find expression!');
	}
	if (!repl.replace) {
		throw new Error('Must provide replacement!');
	}
	try {
		var contents = file.contents.toString();
		file.contents = new Buffer(contents.replace(repl.find, repl.replace));

	} catch (e) {
		console.error(e);
	}
}


function normalize(opts){
	opts = opts || {};
	opts.options = opts.options || {};

	return opts;
}