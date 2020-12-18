import { token, owners } from './Config';
import BotClient from "./client/BotClient";

export const client: BotClient = new BotClient({ token, owners });
console.clear();
client.start();