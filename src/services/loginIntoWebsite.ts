import ConfigPuppeteerPage from "../config/puppeteer"

export default async function loginIntoWebsite(user: string, password: string, ctx: any) {
    if (user == undefined || password == undefined || user.length != 11) {
        ctx.reply('Dados invalidos! Formato esperado (ex: usuario,senha)');
    } else {
        const { browser, page } = await ConfigPuppeteerPage()

        try {
            ctx.reply('Efetuando login no SIGAA');
    
            await page.locator('[name="user.login"]').fill(user)
            await page.locator('[name="user.senha"]').fill(password)
            await page.locator('[value="Entrar"]').click()
    
            await page.locator('xpath//html/body/div[2]/div[2]/div[1]/div[1]/div/form/div/table/tbody/tr/td[1]').click()
    
            return { browser, page }
        } catch(e) {
            ctx.reply('Dados invalidos! Usuario ou senha incorretos');
            await page.close();
            await browser.close();
        }
    }
}