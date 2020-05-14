export const PING_DESCRIPTION = `\`!ping\`: the bot will message you directly with \`pong\``;
export const PING_COMMAND = "ping";

export const ping = (author) => {
  return author.send("pong");
};
