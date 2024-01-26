const { Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, GatewayIntentBits, ComponentType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === 'ping') {
    const confirm = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Yes')
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('No')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(confirm, cancel);

    let obecnosc = {
      yes: [],
      no: [],
    };

    const updateTable = () => {
      return `
      💞𝓟𝓵𝓪𝔂𝓲𝓷𝓰💖      →      ${obecnosc.yes.join(', \nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ')}\n
      💀𝓝𝓸 𝓹𝓵𝓪𝔂𝓲𝓷𝓰💀    →      ${obecnosc.no.join(', \nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ')}\n
      ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      `;
    };

    const table = updateTable();

    const reply = await message.reply({ content: `Do you play wipe?\n\n\n${table}`, components: [row] });

    const collector = reply.createMessageComponentCollector({ componentType: ComponentType.Button });

    collector.on('collect', (msg) => {
      let username = msg.user.username;
      if (msg.customId === 'confirm') {
        obecnosc.yes.push(username);

        if (obecnosc.no.includes(username)) {
          obecnosc.no.splice(obecnosc.no.indexOf(username), 1);
        }
      } else if (msg.customId === 'cancel') {
        obecnosc.no.push(username);

        if (obecnosc.yes.includes(username)) {
          obecnosc.yes.splice(obecnosc.yes.indexOf(username), 1);
        }
      }

      const updatedContent = `Do you play wipe?\n\n\n${updateTable()}\n`;
      msg.update({ content: updatedContent, components: [row] });
    });
  }
});
client.login('MTE5Njg0MjE2MzkyNTk2MjgxNA.GyCgRl.A8OU3L7azAiMA575TphYWgz9aQ8-5E7hxjMjJg');
