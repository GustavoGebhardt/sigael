import { Context } from "telegraf";
import login from "../services/loginService";
import fs from "fs";

export default {
    async handle(ctx: Context) {
        const registrationPage = await login(ctx.text?.split(",")[0]!, ctx.text?.split(",")[1]!, ctx)
        if (registrationPage) {
            const { browser, page } = registrationPage

            ctx.reply('Fazendo download do arquvio...')

            const fileName = `${crypto.randomUUID()}.pdf`;

            await page.locator('xpath//html/body/div[2]/div[2]/div[1]/div[1]/div/form/div/div[1]/table/tbody/tr[3]').click()
            await page.waitForNavigation()
            await page.pdf({
                path: fileName,
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20mm',
                    right: '10mm',
                    bottom: '20mm',
                    left: '10mm',
                },
            });

            await ctx.replyWithDocument({
                source: fs.createReadStream(fileName),
                filename: 'matricula.pdf'
            });
            fs.rm(fileName, (err) => {
                if (err) {
                    console.error('Erro ao remover o arquivo:', err);
                }
            });

            await page.close();
            await browser.close();
        }
    }
};

