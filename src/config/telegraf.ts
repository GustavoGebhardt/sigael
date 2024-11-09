import { Telegraf } from "telegraf"
import 'dotenv/config'

export default function ConfigTelegramBot() {
    return new Telegraf(process.env.BOT_TOKEN!)
}