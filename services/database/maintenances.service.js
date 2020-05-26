import * as redis from "../../database/redis";

export default class MaintenancesService {
  constructor() {
    this.key = "latest-maintenance"
  }

  async getMaintenance() {
    try {
      return await redis.getAsync(this.key);
    } catch(err) {
      console.error("Unable to GET redis: " + err.message);
    }
  }

  async setMaintenance(title) {
    try {
      return await redis.setAsync(this.key, title);
    } catch(err) {
      console.error("Unable to SET redis: " + err.message);
    }
  }
}
