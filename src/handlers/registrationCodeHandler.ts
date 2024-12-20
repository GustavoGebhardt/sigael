import { Context } from "telegraf";
import login from "../services/loginService";

export default {
    async handle(ctx: Context) {
        const registrationPage = await login(ctx.text?.split(",")[0]!, ctx.text?.split(",")[1]!, ctx)
        if (registrationPage) {
            const { browser, page } = registrationPage

            const textSelector = await page.locator('xpath//html/body/div[2]/div[2]/div[1]/div[2]/div[2]/table/tbody/tr[1]/td[2]').waitHandle();
            const registration = await textSelector?.evaluate(el => el.textContent);

            if (registration) ctx.reply("Numero da Matricula: " + registration);

            ctx.reply('Espero ter ajudado. Precisando de mim, estou aqui!');

            await page.close();
            await browser.close();
        }
    }
};

