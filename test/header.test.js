// const puppeteer = require('puppeteer');
const CustomPage = require('./helper/page');

let page;

beforeEach(async () => {
    page = await CustomPage.build();
    await page.goto('localhost:3000');
});

test("text is correct" , async () => {
    const text = await page.getContentOf('a.brand-logo');
    expect(text).toEqual("Blogster");
});

test('It takes to correct page after login is clicked' , async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});

test('It should show the logout button if user logged in' , async () => {
    
    await page.login();

    const text = await page.getContentOf('a[href="/auth/logout"]');

    expect(text).toEqual('Logout');

});

afterEach(async () => {
    try {
        page && await page.close();
    } catch(e) {}
});