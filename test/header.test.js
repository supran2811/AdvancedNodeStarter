const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({ headless : false });
    page = await browser.newPage();
    await page.goto('localhost:3000');
});

test("text is correct" , async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual("Blogster");
},10000);

test('It takes to correct page after login is clicked' , async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
},10000);

afterEach(async () => {
    if(browser) {
        await browser.close();
    }
});