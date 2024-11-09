import loginIntoWebsite from "./services/loginIntoWebsite"
import ConfigTelegramBot from "./config/telegraf"
import { Markup } from "telegraf"
import fs from 'fs'
import 'dotenv/config'

export default async function App() {
    let option: number = 0;

    const app = ConfigTelegramBot()
    app.on('message', async (ctx) => {

        switch (option) {
            case 0:
                ctx.reply(
                    'Opa, bom dia! Como posso ajudar você hoje?',
                    Markup.inlineKeyboard([
                        [Markup.button.callback('Visualizar Boletim', 'RESPOSTA_1')],
                        [Markup.button.callback('Obter Atestado de Matricula', 'RESPOSTA_2')]
                    ])
                );
                break;
            case 1:
                let years: string[] = []
                const bulletinPage = await loginIntoWebsite(ctx.text?.split(",")[0]!, ctx.text?.split(",")[1]!, ctx)
                if(bulletinPage){
                    const { browser, page } = bulletinPage

                    await page.locator('xpath//html/body/div[2]/div[2]/div[1]/div[1]/div/form/div/div[1]/table/tbody/tr[2]').click()

                    await page.waitForSelector('xpath//html/body/div[2]/div[2]/form[2]/table');
                    const yearTable = await page.$$('xpath//html/body/div[2]/div[2]/form[2]/table/tbody/tr[*]/td[1]')
                    for (const year of yearTable) {
                        years.push(await year.evaluate(year => year.textContent!.trim()))
                    }

                    years.map((year) => {
                        app.action(`ANO_${year.charAt(year.length - 1)}`, async (ctx) => {
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

                option = 0
                break;
            case 2:
                const registrationPage = await loginIntoWebsite(ctx.text?.split(",")[0]!, ctx.text?.split(",")[1]!, ctx)
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

                option = 0
                break;
        }
    });

    app.action('RESPOSTA_1', (ctx) => {
        ctx.reply('Por favor, informe seu nome de usuário e senha separados por vírgula (ex: usuario,senha):');
        option = 1
    });

    app.action('RESPOSTA_2', (ctx) => {
        ctx.reply('Por favor, informe seu nome de usuário e senha separados por vírgula (ex: usuario,senha):');
        option = 2
    });

    app.launch();
}