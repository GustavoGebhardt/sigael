import ConfigTelegramBot from "./config/telegraf"
import { Markup } from "telegraf"
import { OptionsEnum } from "./enums/optionsEnum"
import { ActionsEnum } from "./enums/actionsEnum"
import menuHandler from "./handlers/menuHandler"
import bulletinHandler from "./handlers/bulletinHandler"
import registrationHandler from "./handlers/registrationHandler"
import registrationCodeHandler from "./handlers/registrationCodeHandler"
import feedbackHandler from "./handlers/feedbackHandler"
import disableMarkup from "./services/disableMarkup"

export default async function App() {
    let option: number = 0;

    const bot = ConfigTelegramBot()
    bot.on('message', async (ctx) => {

        switch (option) {
            case OptionsEnum.MENU:
                menuHandler.showMenu(ctx);
                break;
            case OptionsEnum.BULLETIN:
                bulletinHandler.handle(ctx, bot);
                option = OptionsEnum.MENU
                break;
            case OptionsEnum.REGISTRATION:
                registrationHandler.handle(ctx);
                option = OptionsEnum.MENU
                break;
            case OptionsEnum.REGISTRATIONCODE:
                registrationCodeHandler.handle(ctx);
                option = OptionsEnum.MENU
                break;
            case OptionsEnum.EMAILTEACHERS:

                option = OptionsEnum.MENU
                break;
            case OptionsEnum.FEEDBACK:
                feedbackHandler.handle(ctx, bot)
                option = OptionsEnum.MENU
                break;
            case OptionsEnum.DONATION:

                option = OptionsEnum.MENU
                break;
        }
    });

    bot.action(ActionsEnum.SHOW_BULLETIN, async (ctx) => {
        await disableMarkup(OptionsEnum.BULLETIN, ctx)
        ctx.reply('Por favor, informe seu nome de usuário e senha separados por vírgula (ex: usuario,senha):');
        option = OptionsEnum.BULLETIN
    });

    bot.action(ActionsEnum.SHOW_REGISTRATION, async (ctx) => {
        await disableMarkup(OptionsEnum.REGISTRATION, ctx)
        ctx.reply('Por favor, informe seu nome de usuário e senha separados por vírgula (ex: usuario,senha):');
        option = OptionsEnum.REGISTRATION
    });

    bot.action(ActionsEnum.SHOW_REGISTRATIONCODE, async (ctx) => {
        await disableMarkup(OptionsEnum.REGISTRATIONCODE, ctx)
        ctx.reply('Por favor, informe seu nome de usuário e senha separados por vírgula (ex: usuario,senha):');
        option = OptionsEnum.REGISTRATIONCODE
    });

    bot.action(ActionsEnum.SHOW_FEEDBACK, async (ctx) => {
        await disableMarkup(OptionsEnum.FEEDBACK, ctx)
        ctx.reply("Digite seu feedback abaixo. Suas opiniões são essenciais para nós e serão enviadas anonimamente:")
        option = OptionsEnum.FEEDBACK
    });

    bot.launch();
}