export const PING_COMMAND = "ping";
export const PING_DESCRIPTION = `\`!${PING_COMMAND}\`: the bot will message you directly with \`pong\``;

export const ping = (author) => {
  return author.send("pong");
};
