const {handler} = require('./index.js');

const [,,phoneNumber] = process.argv;

(async () => {
    try {
        const { callCount } = await handler({ phoneNumber })
        console.log(`callcount for ${phoneNumber} is ${callCount}`);
    } catch (error) {
        console.error(`Failed to increment and retrieve call count for \`${phoneNumber}\`: ${error.message}`)
        process.exit(1);
    }
    process.exit(0);
})();
