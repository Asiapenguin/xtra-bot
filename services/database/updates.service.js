import * as redis from "../../database/redis";

export default class UpdatesService {
  constructor() {
    this.key = "latest-update"
  }

  async getUpdate() {
    try {
      return await redis.getAsync(this.key);
    } catch(err) {
      console.error("Unable to GET redis: " + err.message);
    }
  }

  async setUpdate(title) {
    try {
      return await redis.setAsync(this.key, title);
    } catch(err) {
      console.error("Unable to SET redis: " + err.message);
    }
  }
}
