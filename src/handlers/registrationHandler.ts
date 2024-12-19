import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import login from "../services/loginService";
import fs from "fs";

export default {
    async handle(ctx: Context) {
        const registrationPage = await login(ctx.text?.split(",")[0]!, ctx.text?.split(",")[1]!, ctx)
        if(registrationPage){
            const { browser, page } = registrationPage

            ctx.reply('Fazendo download do arquvio...')

            await page.locator('xpath//html/body/div[2]/div[2]/div[1]/div[1]/div/form/div/div[1]/table/tbody/tr[3]').click()
            await page.waitForNavigation()
            await page.screenshot({
                path: 'screenshot.png',
                fullPage: true
            });

            await ctx.replyWithPhoto({ source: fs.createReadStream('screenshot.png') });
            fs.rm('screenshot.png', (err) => {
                if (err) {
                    console.error('Erro ao remover o arquivo:', err);
                }
            });

            ctx.reply('Espero ter ajudado. Precisando de mim, estou aqui!');

            await page.close();
            await browser.close();
        }
    }
};

