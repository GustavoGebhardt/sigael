import ConfigTelegramBot from "./config/telegraf"
import { OptionsEnum } from "./enums/optionsEnum"
import { ActionsEnum } from "./enums/actionsEnum"
import menuHandler from "./handlers/menuHandler"
import bulletinHandler from "./handlers/bulletinHandler"
import registrationHandler from "./handlers/registrationHandler"

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
        }
    });

    bot.action(ActionsEnum.SHOW_BULLETIN, (ctx) => {
        ctx.reply('Por favor, informe seu nome de usuário e senha separados por vírgula (ex: usuario,senha):');
        option = OptionsEnum.BULLETIN
    });

    bot.action(ActionsEnum.SHOW_REGISTRATION, (ctx) => {
        ctx.reply('Por favor, informe seu nome de usuário e senha separados por vírgula (ex: usuario,senha):');
        option = OptionsEnum.REGISTRATION
    });

    bot.launch();
}