import UrlService from "../../services/url.service"
import Axios from "axios";
import LodestoneScraperService from "../../services/lodestone-scraper.service";
import { NEWS_CHANNEL_NAME } from "../../constants/constants";
import MessageEmbedService from "../../services/message-embed.service";

export const runLatestLodestonePosts = async (client) => {
  let newsChannel = client.channels.cache.find(channel => channel.name == NEWS_CHANNEL_NAME);

  let topicsUrl = UrlService.getLodestoneTopicsUrl();
  // let maintenanceUrl = UrlService.getLodestoneMaintenanceUrl();
  // let updatesUrl = UrlService.getLodestoneUpdatesUrl();

  // TODO: Use MongoDB to store last run's information;
  let lastLatestTopic = { title: "not the same title" };
  // let lastLatestMaintenance = localStorage.getItem("latest-maintenance");
  // let lastLatestUpdates = localStorage.getItem("latest-updates");

  let topicsHtml = await (await Axios.get(topicsUrl)).data;
  // let maintenanceHtml = await (await Axios.get(maintenanceUrl)).data;
  // let updatesHtml = await (await Axios.get(updatesUrl)).data;
  
  let currentLatestTopic = LodestoneScraperService.getLatestTopics(topicsHtml);
  
  if (currentLatestTopic.title !== lastLatestTopic.title) {
    let newTopicMessage = MessageEmbedService.getNewTopicMessage(currentLatestTopic);
    newsChannel.send(newTopicMessage);
  }

}