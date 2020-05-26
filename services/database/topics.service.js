import * as redis from "../../database/redis";

export default class TopicsService {
  constructor() {
    this.key = "latest-topic"
  }

  async getTopic() {
    try {
      return await redis.getAsync(this.key);
    } catch(err) {
      console.error("Unable to GET redis: " + err.message);
    }
  }

  async setTopic(title) {
    try {
      return await redis.setAsync(this.key, title);
    } catch(err) {
      console.error("Unable to SET redis: " + err.message);
    }
  }
}
