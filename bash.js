var commands = require('./commands.js');

// console.log(Object.keys(process));

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
	var cmd = data.toString().trim();
	var cmd = cmd.split(" ");
	try{
		commands.commands[cmd.shift()](cmd);
	} catch (err) {
		process.stdout.write(err.message+ "\n");
	}
	//process.stdout.write('You typed: ' + cmd);
});