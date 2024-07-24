const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const { spawn } = require('node:child_process');
		const ls = spawn('node', ['deploy-commands.js']);

		ls.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		ls.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
		});

		ls.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
		});
		
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}
};