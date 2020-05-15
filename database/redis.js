var redis = require("redis");
var { promisify } = require("util");
const client = redis.createClient();

client.on("connect", () => {
  console.log("connected to redis");
});

client.on("error", (err) => {
  console.log("redis connection error: ", err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = {
  getAsync,
  setAsync,
}