import { Context } from "telegraf";
import login from "../services/loginService";

export default {
    async handle(ctx: Context) {
        const registrationPage = await login(ctx.text?.split(",")[0]!, ctx.text?.split(",")[1]!, ctx)
        if (registrationPage) {
            const { browser, page } = registrationPage

            //Sem turmas cadastradas no SIGA-A

            await page.close();
            await browser.close();
        }
    }
};