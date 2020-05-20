export default class UrlService {
  constructor() {}

  static getBaseUrl() {
    return "https://na.finalfantasyxiv.com"
  }

  static getFreeCompanySearchUrl(freeCompanyName, freeCompanyServer) {
    let escapedFreeCompanyName = freeCompanyName.replace(" ", "+");
    return `${this.getBaseUrl()}/lodestone/freecompany/?q=${escapedFreeCompanyName}&worldname=${freeCompanyServer}`;
  }

  static getLodestoneTopicsUrl() {
    return `${this.getBaseUrl()}/lodestone/topics`;
  }

  static getLodestoneMaintenanceUrl() {
    return `${this.getBaseUrl()}/lodestone/category/2`;
  }
  
  static getLodestoneUpdatesUrl() {
    return `${this.getBaseUrl()}/lodestone/category/3`;
  }

  static getLodestoneServerStatusUrl() {
    return `${this.getBaseUrl()}/lodestone/worldstatus`;
  }
}