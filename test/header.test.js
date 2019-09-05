const puppeteer = require('puppeteer');
const sessionFactory = require('./factory/sessionFactory');
const userFactory = require('./factory/userFactory');

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

test.only('It should show the logout button if user logged in' , async () => {
    
    const user = await userFactory('supran');

    const { session , sig } = sessionFactory(user);

    await page.setCookie({ name : 'session' , value: session} , {name:'session.sig' , value: sig});

    await page.reload();

    await page.waitFor('a[href="/auth/logout"]');

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

    expect(text).toEqual('Logout');

},50000);

afterEach(async () => {
    if(browser) {
        await browser.close();
    }
});