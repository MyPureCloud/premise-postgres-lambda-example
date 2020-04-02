
const { getPgClient } = require('./lib/getPostgresClient');

let pgClient;

exports.handler = async function ({ phoneNumber }) {
    pgClient = await getPgClient();
    if (!phoneNumber) {
        throw new Error('No phone number provided');
    }
    let callCounter = await getCallCounter(phoneNumber);
    if (!callCounter) {
        await createCallCounter(phoneNumber, 1);
        return { callCount: 1 };
    }
    let {call_count: callCount} = callCounter;
    await updateCallCounter(phoneNumber, ++callCount);
    return { callCount };
}

async function createCallCounter(phoneNumber, callCount) {
    await pgClient.query("INSERT INTO call_counters (phone_number, call_count) values ($1, $2)", [phoneNumber, callCount]);
} 

async function getCallCounter(phoneNumber) {
    const {rows} = await pgClient.query("SELECT call_count FROM call_counters WHERE phone_number=$1 LIMIT 1", [phoneNumber]);
    if (!rows.length) { return null; }
    return rows[0];
}

async function updateCallCounter(phoneNumber, callCount) {
    await pgClient.query("UPDATE call_counters SET call_count=$2 WHERE phone_number=$1", [phoneNumber, callCount]);
}
