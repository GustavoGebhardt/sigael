import { Context, Markup, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import login from "../services/loginService";
import fs from "fs";

export default {
    async handle(ctx: Context, bot: Telegraf<Context<Update>>) {
        let years: string[] = []
        const bulletinPage = await login(ctx.text?.split(",")[0]!, ctx.text?.split(",")[1]!, ctx)
        if(bulletinPage){
            const { browser, page } = bulletinPage

            await page.locator('xpath//html/body/div[2]/div[2]/div[1]/div[1]/div/form/div/div[1]/table/tbody/tr[2]').click()

            await page.waitForSelector('xpath//html/body/div[2]/div[2]/form[2]/table');
            const yearTable = await page.$$('xpath//html/body/div[2]/div[2]/form[2]/table/tbody/tr[*]/td[1]')
            for (const year of yearTable) {
                years.push(await year.evaluate(year => year.textContent!.trim()))
            }

            years.map((year) => {
                bot.action(`ANO_${year.charAt(year.length - 1)}`, async (ctx: Context) => {
                    ctx.reply('Fazendo download do arquvio...')

                    await page.locator(`xpath//html/body/div[2]/div[2]/form[2]/table/tbody/tr[${year.charAt(year.length - 1)}]/td[3]/a`).click();
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
                });
            })

            ctx.reply(
                'Qual ano você deseja visualizar?',
                Markup.inlineKeyboard(years.map((year => {
                    return [Markup.button.callback(year, `ANO_${year.charAt(year.length - 1)}`)]
                })))
            );

        }
    }
};
