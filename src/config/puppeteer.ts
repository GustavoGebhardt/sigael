import puppeteer from 'puppeteer'
import 'dotenv/config'

export default async function ConfigPuppeteerPage() {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_PATH,
    });
    const page = await browser.newPage();

    await page.goto(process.env.URL!);
    await page.setViewport({ width: 1080, height: 1024 });

    return { browser, page }
}