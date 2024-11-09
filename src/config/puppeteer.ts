import puppeteer from 'puppeteer'
import 'dotenv/config'

export default async function ConfigPuppeteerPage() {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome'
    });
    const page = await browser.newPage();

    await page.goto(process.env.URL!);
    await page.setViewport({ width: 1080, height: 1024 });

    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.resourceType() === 'image' || request.url().includes('favicon.ico')) {
            request.abort();
        } else {
            request.continue();
        }
    });

    return { browser, page }
}