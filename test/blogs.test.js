const Page = require('./helper/page');

let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');
});

test("It should go to new blog page" , async () => {
    await page.login();
    
    await page.click('a[href="/blogs/new');

    const text = await page.getContentOf('form label');

    expect(text).toEqual('Blog Title');

});

afterEach(async () => {
    await page.close();
})