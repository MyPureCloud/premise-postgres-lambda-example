const {Client: PostgresClient} = require('pg');

let pgClient;

exports.getPgClient = async function () {
    if (pgClient) { return pgClient; }
    pgClient = new PostgresClient();
    await pgClient.connect();
    return pgClient;
}
