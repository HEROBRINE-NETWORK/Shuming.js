import { Client, GatewayIntentBits, Partials } from "discord.js";
import { PREFIX, BOT_TOKEN, OWNER_IDS } from "./src/config.js";
import { dirname } from "node:path";
import { ButtonManager } from "./src/structures/managers/buttonCommands.js";
import { EventManager } from "./src/structures/managers/events.js";
import { MessageCMDManager } from "./src/structures/managers/messageCommands.js";
import { ModalManager } from "./src/structures/managers/modalForms.js";
import { SelectMenuManager } from "./src/structures/managers/selectMenus.js";
import { SlashManager } from "./src/structures/managers/slashCommands.js";
import JSONdb from "simple-json-db";
import { Client as dokdo } from './dokdo/index.js';
import Logger from './src/utils/logger.js'

const __dirname = dirname(import.meta.url);
export const rootPath = __dirname;

(async () => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent, // Only for bots with message content intent access.
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildInvites,
        ],
        partials: [Partials.Channel]
    });

    // Dokdo
    client.dok = new dokdo(client, {
    prefix: `${PREFIX}`,
    owners: `${OWNER_IDS}`,
    aliases: ["jsk", "dok", "dokdo"],
    });

    client.cooldownDB = new JSONdb("./cooldownDB.json");
    client.logger = new Logger();

    client.messageCommands = new Map();
    client.messageCommands_Aliases = new Map();
    client.events = new Map();
    client.buttonCommands = new Map();
    client.selectMenus = new Map();
    client.modalForms = new Map();
    client.contextMenus = new Map();
    client.slashCommands = new Map();

    await MessageCMDManager(client, __dirname);
    await EventManager(client, __dirname);
    await ButtonManager(client, __dirname);
    await SelectMenuManager(client, __dirname);
    await ModalManager(client, __dirname);
    await client.login(BOT_TOKEN);
    await SlashManager(client, __dirname); // Includes context menu handling as they belong to same command type.
})();