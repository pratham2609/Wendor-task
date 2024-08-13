import { createClient } from 'redis';

const client = createClient();
// createClient({
//     url: 'redis://alice:foobared@awesome.redis.server:6380'
// });


async function startRedis() {
    try {
        await client.connect();
        console.log("Worker connected to Redis");
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}
client.on('error', err => console.log('Redis Client Error', err));

export default client;
export { startRedis };