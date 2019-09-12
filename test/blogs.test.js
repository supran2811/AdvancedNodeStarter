const Page = require('./helper/page');

let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

describe('When logged in' , async () => {
    beforeEach(async () => {
        await page.login();
        await page.click('a[href="/blogs/new');
    });
    test("It should go to new blog page" , async () => {
       const text = await page.getContentOf('form label');
       expect(text).toEqual('Blog Title');
    });

    describe('Using in valid input' , async () => {
        beforeEach(async () => {
            await page.click('form button');
        });

        test('It should show the error message' , async () => {
           const titleError = await page.getContentOf('.title .red-text');
           const contentError = await page.getContentOf('.content .red-text');

           expect(titleError).toEqual('You must provide a value');
           expect(contentError).toEqual('You must provide a value');
        })
    });

    describe('Using valid input' , async () => {
        beforeEach(async () => {
            await page.type('.title input','This is title');
            await page.type('.content input','This is content of the blog!!!');
            await page.click('form button');
        });

        test('After submitting it should take to the review screen' , async () => {
            const text = await page.getContentOf('form h5');
            expect(text).toEqual('Please confirm your entries');
        });

        test('After review it should take to the blog index screen' , async () => {
            await page.click('button.green');
            await page.waitFor('.card');

            const title = await page.getContentOf('.card-title');
            const content = await page.getContentOf('.card-content p');

            expect(title).toEqual('This is title');
            expect(content).toEqual('This is content of the blog!!!');
        })
    });

});

describe('When user logout' , async () => {
    const actions = [
        {
            path: '/api/blogs',
            method:'get'
        },
        {
            path:'/api/blogs',
            method:'post',
            data : {title:'T' , content:'C'}
        }
    ]

    test('User should not be able to perform restricted actions' , async () => {
        const results = await page.execute(actions);

        for(const r of results) {
            expect(r).toEqual({error: 'You must log in!'});
        }
    });
    // test('User should not be able to create the blog' , async () => {
    //     const result = await page.post('/api/blogs' , {title:'T' , content:'C'});
    //     expect(result).toEqual({error: 'You must log in!'});
    // });

    // test('User should not be able to see the blogs' , async () =>{
    //     const result = await page.get('/api/blogs');

    //     expect(result).toEqual({error: 'You must log in!'});
    // });

});

afterEach(async () => {
    try {
        page && await page.close();
    } catch(e) {}
})