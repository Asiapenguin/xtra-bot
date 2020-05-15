import $ from "cheerio";
import UrlService from "./url.service";

export default class LodestoneScraperService {
  constructor() {}

  static getFreeCompanyInformation(html) {
    let entryAnchor = $("div[class='entry']", html).find("a").first()
    
    if (entryAnchor.length === 0) 
      return { error: "Free company not found" };

    let fcLink = entryAnchor.attr("href");
    let fcCrest = entryAnchor.find(".entry__freecompany__crest__image").find("img").last().attr("src");
    let fcGrandCompany = entryAnchor.find(".entry__world").first().text();
    let fcName = entryAnchor.find(".entry__name").text();
    let fcServer = entryAnchor.find(".entry__world").last().text();
    
    let fcAdditionalInfo = entryAnchor.find("ul");
    let fcMembersNum = fcAdditionalInfo.find("li.entry__freecompany__fc-member").text();
    let fcHousing = fcAdditionalInfo.find("li.entry__freecompany__fc-housing").text();
    if (fcHousing.indexOf("No") > -1) fcHousing = "No Housing";
    let fcActiveStatus = fcAdditionalInfo.find("li.entry__freecompany__fc-active").first().text().split(":")[1].trim();;
    let fcRecruitmentStatus = fcAdditionalInfo.find("li.entry__freecompany__fc-active").last().text().split(":")[1].trim();

    return {
      link: UrlService.getBaseUrl() + fcLink,
      crest: fcCrest,
      grandCompany: fcGrandCompany,
      name: fcName,
      server: fcServer,
      members: fcMembersNum,
      housing: fcHousing,
      active: fcActiveStatus,
      recruitment: fcRecruitmentStatus
    }
  }

  static getLatestTopics(html) {
    // "news__content"
    let newsContent = $("div[class='ldst__main']", html).find("div").first();

    let latestTopic = newsContent.find("ul").eq(1).find("li").first();

    let latestTopicHeaderAnchor = latestTopic.find("header").first().find("a")
    let latestTopicTitle = latestTopicHeaderAnchor.text();
    let latestTopicLink = latestTopicHeaderAnchor.attr("href");

    let latestTopicBannerAnchor = latestTopic.find("div").first().find("a");
    let latestTopicImage = latestTopicBannerAnchor.find("img").first().attr("src");

    return {
      title: latestTopicTitle,
      link: UrlService.getBaseUrl() + latestTopicLink,
      image: latestTopicImage,
    }
  }

  static getLatestMaintenance(html) {

  }

  static getLatestUpdates(html) {

  }
}