import UrlService from "../../services/url.service";
import Axios from "axios";
import LodestoneScraperService from "../../services/lodestone-scraper.service";
import { NEWS_CHANNEL_NAME } from "../../constants/constants";
import MessageEmbedService from "../../services/message-embed.service";
import TopicsService from "../../services/database/topics.service";
import MaintenancesService from "../../services/database/maintenances.service";
import UpdatesService from "../../services/database/updates.service";

const topicsService = new TopicsService();
const maintenancesService = new MaintenancesService();
const updatesService = new UpdatesService();

export const runLatestLodestonePosts = async (client) => {
  console.log(`Started fetching latest Lodestone Posts at ${new Date(Date.now()).toTimeString()}`);
  let newsChannel = client.channels.cache.find((channel) => channel.name == NEWS_CHANNEL_NAME);

  handleTopics(newsChannel);
  handleMaintenances(newsChannel);
  handleUpdates(newsChannel);
};

const handleTopics = async (newsChannel) => {
  let topicsUrl = UrlService.getLodestoneTopicsUrl();

  let lastLatestTopic = await topicsService.getTopic();

  let topicsHtml = await (await Axios.get(topicsUrl)).data;
  let currentLatestTopic = LodestoneScraperService.getLatestTopic(topicsHtml);

  if (currentLatestTopic.title !== lastLatestTopic) {
    console.log("Detected new topic: " + currentLatestTopic.title);
    await topicsService.setTopic(currentLatestTopic.title);
    let newTopicMessage = MessageEmbedService.getNewTopicMessage(currentLatestTopic);
    newsChannel.send(newTopicMessage);
  } else {
    console.log("No new topics");
  }
};

const handleMaintenances = async (newsChannel) => {
  let maintenanceUrl = UrlService.getLodestoneMaintenanceUrl();

  let lastLatestMaintenance = await maintenancesService.getMaintenance();

  let maintenanceHtml = await (await Axios.get(maintenanceUrl)).data;
  let currentLatestMaintenance = LodestoneScraperService.getLatestMaintenance(maintenanceHtml);

  if (currentLatestMaintenance.title != lastLatestMaintenance) {
    console.log("Detected new maintenance: " + currentLatestMaintenance.title);
    await maintenancesService.setMaintenance(currentLatestMaintenance.title);
    let newMaintenanceMessage = MessageEmbedService.getNewMaintenanceMessage(
      currentLatestMaintenance
    );
    newsChannel.send(newMaintenanceMessage);
  } else {
    console.log("No new maintenances");
  }
};

const handleUpdates = async (newsChannel) => {
  let updatesUrl = UrlService.getLodestoneUpdatesUrl();

  let lastLatestUpdate = await updatesService.getUpdate();

  let updatesHtml = await (await Axios.get(updatesUrl)).data;
  let currentLatestUpdate = LodestoneScraperService.getLatestUpdate(updatesHtml);

  if (currentLatestUpdate.title != lastLatestUpdate) {
    console.log("Detected new update: " + currentLatestUpdate.title);
    await updatesService.setUpdate(currentLatestUpdate.title);
    let newUpdateMessage = MessageEmbedService.getNewUpdateMessage(currentLatestUpdate);
    newsChannel.send(newUpdateMessage);
  } else {
    console.log("No new updates");
  }
};
