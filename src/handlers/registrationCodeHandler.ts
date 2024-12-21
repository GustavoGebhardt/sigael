import { Context } from "telegraf";
import login from "../services/loginService";

export default {
    async handle(ctx: Context) {
        const homePage = await login(ctx.text?.split(",")[0]!, ctx.text?.split(",")[1]!, ctx)
        if (homePage) {
            const { browser, page } = homePage

            const textSelector = await page.locator('xpath//html/body/div[2]/div[2]/div[1]/div[2]/div[2]/table/tbody/tr[1]/td[2]').waitHandle();
            const registration = await textSelector?.evaluate(el => el.textContent);

            if (registration) ctx.reply("Numero da Matricula: " + registration);

            await page.close();
            await browser.close();
        }
    }
};

