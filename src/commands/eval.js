module.exports = {
  	description: "Run JavaScript code. This is DANGEROUS, so only use it if you know what you're doing. Never run any code from people you don't trust.",
  	usage: {
    	"<код>": "JavaScript код."
  	},
  	examples: {},
  	aliases: [ "evaluate", "e" ],
  	permissionRequired: 4, // 0 All, 1 Admins, 2 Server Owner, 3 Bot Admin, 4 Bot Owner
  	checkArgs: (args) => !!args.length
};

module.exports.run = async (message, args) => {
	let content = args.join(" ");
	try {
	  	let evaled = await eval(content);
	  	if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
	  
	  	message.channel.send(evaled, { code: "js", split: true });
	} catch(e) {
	  	let err;
	  	if (typeof e == "string") err = e.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	  	else err = e;
	  	message.channel.send(err, { code: "fix", split: true });
	};
};