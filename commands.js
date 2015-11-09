var fs = require("fs");
var request = require("request");
var path = require("path");


var commands = {
	pwd: function() {
		var output = "";
		output+=(__dirname + "\n");
		done(output);
	},
	date: function() {
		var output = "";
		var temp = new Date();
		output+=(temp.toString() + "\n");
		done(output);
	},
	ls: function(directory) {
		var output = "";
		if (directory.length !== 1) {
			directory = "./";
		} else {
			directory = directory[0];
		}
		fs.readdir(directory, function(err, files) {
			files.forEach(function(file) {
				output+=(file.toString() + "\n");
			});
			done(output);
		});
	},
	echo: function(strArr) {
		var output = "";
		var printStr = strArr.join(" ");
		output+=(printStr + "\n")
		done(output);
	},
	cat: function(filename) {
		var output = "";
		var recursivePart = function() {
			if (filename.length < 1) {
				throw new Error("Wrong number of arguments");
			}
			fs.readFile(filename[0], function(err, contents) {
				if (err) throw err;
				output+=(contents.toString() + "\n");
				if(filename.length === 1) {
					done(output);
				}
				if(filename.length > 1) {
					filename.shift();
					try{
						recursivePart(filename);
					} catch (err) {
						throw err;
					}
				}
			});
		}
		recursivePart(filename);	
	},
	head: function(filename) {
		var output = "";
		var recursivePart = function() {
			if (filename.length < 1) {
				throw new Error("Wrong number of arguments");
			}
			fs.readFile(filename[0], function(err, contents) {
				if (err) throw err;
				var contentArr = contents.toString().split("\n");
				if (contentArr.length <= 5) {
					output+=(contents.toString() + "\n");
				} else {
					for (var i = 0; i < 5; i++) {
						output+=(contentArr[i] + "\n");
					}
				};
				if (filename.length === 1) {
					done(output);
				}
				if (filename.length > 1) {
					filename.shift();
					try {
						recursivePart(filename);
					} catch (err) {
						throw err;
					}
				}
			})
		}
		recursivePart(filename);
	},
	tail: function(filename) {
		var output = "";
		var recursivePart = function() {
			if (filename.length < 1) {
				throw new Error("Wrong number of arguments");
			}
			fs.readFile(filename[0], function(err, contents) {
				if (err) throw err;
				var contentArr = contents.toString().split("\n");
				if (contentArr.length <= 5) {
					output+=(contents.toString() + "\n");
				} else {
					for (var i = contentArr.length - 5; i < contentArr.length; i++) {
						output+=(contentArr[i] + "\n");
					}
				};
				if (filename.length === 1) {
					done(output);
				}
				if (filename.length > 1) {
					filename.shift();
					try {
						recursivePart(filename);
					} catch (err) {
						throw err;
					};
				};
			})
		}
		recursivePart();
	}, 
	sort: function(filename) {
		var output = "";
		if (filename.length !== 1) {
			throw new Error("Wrong number of arguments");
		}
		fs.readFile(filename[0], function(err, contents) {
			if (err) throw err;
			var contentArr = contents.toString().split("\n");
			contentArr = contentArr.sort();
			contentArr.forEach(function(row) {
				output+=(row + "\n");
			});
			done(output);
		})
	},
	wc: function(filename) {
		var output = "";
		if (filename.length !== 1) {
			throw new Error("Wrong number of arguments");
		}
		fs.readFile(filename[0], function(err, contents) {
			if (err) throw err;
			var contentArr = contents.toString().split("\n");
			output+=(contentArr.length + "\n");
			done(output);
		})
	},
	uniq: function(filename) {
		var output = "";
		if (filename.length !== 1) {
			throw new Error("Wrong number of arguments");
		}
		fs.readFile(filename[0], function(err, contents) {
			if (err) throw err;
			var contentArr = contents.toString().split("\n");
			output+=(contentArr[0] + "\n")
			for (var i = 1; i < contentArr.length; i++) {
				if (contentArr[i].localeCompare(contentArr[i-1])) {
					output+=(contentArr[i] + "\n");
				};
			}
			done(output);
		})
	},
	curl: function(url) {
		var output = "";
		if (url.length !== 1) {
			throw new Error("U dun goofed f00l!")
		}
		request(url[0], function(err, response, body) {
			if (!err && response.statusCode === 200) {
				output+=(body + "\n")
			};	
			done(output);
		})
	}
}

var done = function(output) {
	process.stdout.write(output+'prompt > ');
}

module.exports.commands = commands;

