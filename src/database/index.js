const config = require("../../config"), mongoose = require("mongoose");

module.exports = async () => {
    await mongoose.connect(config.database_uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).catch(e => {
        log.error(e.message + ": " + e.stack);
        client.shard.send("respawn");
    });

    await require("./global").load();

    return {
        guild: require("./guild")(), // guild(guildid)
        cacheGuilds: require("./guild").cacheAll,
        global: require("./global.js")
    };
};