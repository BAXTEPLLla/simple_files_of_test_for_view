const testID = 'PE-TEST_ID'

module.exports = {
    '@tags': [testID, 'Full_Regression', 'add_new_ads'],

    'Go to main page of web-page *******,, and prove if you can add new  custom ads.': function (browser) {

        //page object model, set pages what will be used.
        let login = browser.page.login();
        let menuOverlay = browser.page.menuOverlay();
        let ads = browser.page.ads();

        //account data for use
        let accLogin = browser.globals.testData.ADD_NOCAPTCHA.USERNAME;
        let accPassword = browser.globals.testData.ADD_NOCAPTCHA.PASSWORD;

        //parameters for function 
        let category = ads.__options.elements.buySell;
        let subCategory = ads.__options.elements.equipment;
        let timePeriod = ads.__options.elements.fifteenDays;
        let image = ads.__options.data.image;

        let randomString = require('random-string')
        let title = 'Test-automation Ads' + ' ' + randomString({ length: 4, numeric: true, letters: false, })

        //Choose what ads you want create - with paragraph or article (modify it if needed)
        const txtgen = require('txtgen');
        //let textBody = txtgen.sentence();
        //let textBody = txtgen.paragraph();
        //let textBody = txtgen.article();
        let textBody = txtgen.sentence() + '\n\n' + txtgen.paragraph() + '\n\n' + txtgen.sentence();

        //verify we logged in
        login
            .loginFunction(accLogin, accPassword)
        //verify we landed on our testing web-page and made one of the specific custom ads (modify  parameters if its needed)
        menuOverlay
            .selectTab("@ads")
        ads
            .customAdsConstructor({
                category,
                subCategory,
                timePeriod,
                image,
                title,
                textBody
            })
        menuOverlay.selectTab("@ads")
        ads.expect.element('@ads').text.to.contain(title)
        browser.end();
    }
}