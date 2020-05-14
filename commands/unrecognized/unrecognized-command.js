export const unrecognized = (command, channel) => {
  return channel.send(`I don't know how to use \`${command}\``);
};
