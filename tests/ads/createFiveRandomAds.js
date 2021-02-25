const testID = 'PE-TEST_ID'

module.exports = {
    '@tags': [testID, 'Full_Regression', 'add_new_ads'],

    'Go to main page of web-page *******, and prove if you can add 5 random ads.': function (browser) {

         //page object model, set pages what will be used.
        let login = browser.page.login();
        let menuOverlay = browser.page.menuOverlay();
        let ads = browser.page.ads();
        
        //account data for use
        let accLogin = browser.globals.testData.ADD_NOCAPTCHA.USERNAME;
        let accPassword = browser.globals.testData.ADD_NOCAPTCHA.PASSWORD;

        //verify we logged in
        login
            .loginFunction(accLogin, accPassword)
        //verify we landed on our testing web-page
        menuOverlay
            .selectTab("@ads")
        //verify we created five random ads, and prove each of them after creation
        for (i = 0; i < 4; i++) {
            ads.addRandomAds(browser)
            menuOverlay.selectTab("@ads")
        }
        browser.end();
    }
}