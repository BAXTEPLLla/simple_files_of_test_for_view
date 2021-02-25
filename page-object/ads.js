const { xpathSelector } = require('./_common.js');

//Login Page
module.exports = {
    url: function () {
        return this.api.launchUrl + this.__options.data.pageUrl;
    },
    commands: [{

        //click submit and pause for page load
        submit: function (button) {
            this
                .waitForElementVisible(button)
                .click(button);
            this.api.pause(this.api.globals.testData.PAUSE_TIME);
            return this;
        },

        addRandomAds: function (browser) {

            let ads = browser.page.ads();
            let menuOverlay = browser.page.menuOverlay();

            //text for title and body
            let randomString = require('random-string')
            let title = 'Test-automation Ads' + ' ' + randomString({ length: 4, numeric: true, letters: false, })
            const txtgen = require('txtgen');
            let textBody = txtgen.sentence() + '\n\n' + txtgen.paragraph() + '\n\n' + txtgen.sentence();

            this
                .waitForElementVisible('@addNewAdsButton')
                .click('@addNewAdsButton')
                .pause(1000)
                .waitForElementVisible('@сategoryDropdown')
                .click('@сategoryDropdown')
                .waitForElementVisible("@chosenResult")

            browser.elements('xpath', "//*[@class='active-result']", function (res) {
                //Category element count   
                let i = res.value.length;
                //get random index
                let randomCategory = Math.floor((Math.random() * i) + 1);
                this
                    .click("(//*[@class='active-result'])[" + randomCategory + "]")
            })

            ads.isVisible('@timePeriodDropdown3', function (result) {
                if (result.status == -1) {
                    ads
                        .click("@timePeriodDropdown2")
                        .waitForElementVisible("@chosenResult")
                    browser.elements('xpath', "//*[@class='active-result']", function (res) {
                        //Subcategory element count   
                        let i = res.value.length;
                        //get random index
                        let randomCategory = Math.floor((Math.random() * i) + 1);
                        this
                            .click("(//*[@class='active-result'])[" + randomCategory + "]")
                    })

                } else if (result.status == 0) {
                    ads
                        .click("@subcategoryDropdown")
                        .waitForElementVisible("@chosenResult")
                    browser.elements('xpath', "//*[@class='active-result']", function (res) {
                        //Subcategory element count   
                        let i = res.value.length;
                        //get random index
                        let randomSubCategory = Math.floor((Math.random() * i) + 1);
                        this
                            .click("(//*[@class='active-result'])[" + randomSubCategory + "]")
                    })
                    ads
                        .click("@timePeriodDropdown3")
                        .waitForElementVisible("@chosenResult")
                    browser.elements('xpath', "//*[@class='active-result']", function (res) {
                        //Subcategory element count   
                        let i = res.value.length;
                        //get random index
                        let randomDate = Math.floor((Math.random() * i) + 1);
                        this
                            .click("(//*[@class='active-result'])[" + randomDate + "]")
                    })
                }
            })

            browser.elements('xpath', "//*[@class='react-fine-uploader-file-input']", function (res) {
                let i = res.value.length;
                //get random images element count for upload
                let randomImageContainers = Math.floor((Math.random() * i) + 1);

                for (i = 1; i <= randomImageContainers; i++) {
                    let rand = Math.floor((Math.random() * 11) + 1);
                    let imagePath_1 = require('path').resolve(__dirname + `/../resources/images/${ads.__options.data.image[rand]}`);
                    this
                        .setValue("//*[@class='react-fine-uploader-file-input']", imagePath_1)
                        .pause(500)
                };
            })
            this
                .setValue('@addTitle', title)
                .pause(1000)
                .setValue('@addTextBody', textBody)
                .submit('@submitButton')
                .pause(1000)
            menuOverlay.selectTab("@ads")
            ads.expect.element('@ads').text.to.contain(title)

            this.api.pause(this.api.globals.testData.PAUSE_TIME);
            return this;

        },

        customAdsConstructor: function ({ category, subCategory, timePeriod, image, title, textBody }) {
            this
                .waitForElementVisible('@addNewAdsButton')
                .click('@addNewAdsButton')
                .pause(1000)
                .waitForElementVisible('@сategoryDropdown')
                .click('@сategoryDropdown')
                .waitForElementVisible(category)
                .click(category)

            if (subCategory !== undefined) {
                this
                    .waitForElementVisible('@subcategoryDropdown')
                    .click('@subcategoryDropdown')
                    .waitForElementVisible(subCategory)
                    .click(subCategory)
                    .waitForElementVisible('@timePeriodDropdown3')
                    .click('@timePeriodDropdown3')
                    .waitForElementVisible(timePeriod)
                    .click(timePeriod)
            } else if (subCategory == undefined) {
                this
                    .waitForElementVisible('@timePeriodDropdown2')
                    .click('@timePeriodDropdown2')
                    .waitForElementVisible(timePeriod)
                    .click(timePeriod)
            };

            if (image !== undefined) {
                let rand = Math.floor((Math.random() * 11) + 1);
                let imagePath_1 = require('path').resolve(__dirname + `/../resources/images/${image[rand]}`);

                this.setValue('@imageContainer', imagePath_1)
                    .pause(500)
            };

            if (image !== undefined) {
                let rand = Math.floor((Math.random() * 11) + 1);
                let imagePath_2 = require('path').resolve(__dirname + `/../resources/images/${image[rand]}`);

                this.setValue('@imageContainer', imagePath_2)
            };
            this
                .setValue('@addTitle', title)
                .pause(1000)
                .setValue('@addTextBody', textBody)
                .submit('@submitButton')

            this.api.pause(this.api.globals.testData.PAUSE_TIME);
            return this;

        }


    }],
    elements: {
        /////////////////////Add ads page

        //image container's
        imageContainer: xpathSelector("//*[@class='react-fine-uploader-file-input']"),


        //Buttons
        addNewAdsButton: xpathSelector("//*[@class='add-ads-link']"),

        //Dropdown's on add new ads page
        сategoryDropdown: xpathSelector("(//*[@class='dropdown-base_wrapper chosen-container chosen-container-single chosen-container-single-nosearch dropdown_wrapper'])[1]"),
        subcategoryDropdown: xpathSelector("(//*[@class='dropdown-base_wrapper chosen-container chosen-container-single chosen-container-single-nosearch dropdown_wrapper'])[2]"),
        subcategoryDisabled: xpathSelector("//*[@class='dropdown-base_wrapper chosen-container chosen-container-single chosen-container-single-nosearch dropdown_wrapper dropdown_disabled']"),
        timePeriodDropdown2: xpathSelector("(//*[@class='dropdown-base_wrapper chosen-container chosen-container-single chosen-container-single-nosearch dropdown_wrapper'])[2]"),
        timePeriodDropdown3: xpathSelector("(//*[@class='dropdown-base_wrapper chosen-container chosen-container-single chosen-container-single-nosearch dropdown_wrapper'])[3]"),
        buySellCategoryDropdown: xpathSelector("//*[@class='chosen-single']//*[contains(text(), 'Buy and sell')]"),

        //Active results of dropdowns
        //-----------------------------
        chosenResult: xpathSelector("//*[@class='chosen-results']"),
        activeResult: xpathSelector("//*[@class='active-result']"),

        //Category
        transportation: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Transportation')]"),
        buySell: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Buy and sell')]"),
        jobOffer: xpathSelector("//*[@class='active-result']//*[contains(text(), 'offer a job')]"),
        lookingJob: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Looking for a job')]"),
        other: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Other')]"),

        //Subcategory
        transport: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Transport')]"),
        parts: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Spare parts')]"),
        equipment: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Equipment')]"),
        accessories: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Accessories')]"),
        other: xpathSelector("//*[@class='active-result']//*[contains(text(), 'Other')]"),

        //Time period category
        fiveDays: xpathSelector("//*[@class='active-result']//*[contains(text(), '5 Days')]"),
        tenDays: xpathSelector("//*[@class='active-result']//*[contains(text(), '10 Days')]"),
        fifteenDays: xpathSelector("//*[@class='active-result']//*[contains(text(), '15 Days')]"),

        //Ads title
        addTitle: xpathSelector("//input[@name='title']"),
        addTextBody: xpathSelector("//textarea[@name='notes']"),

        //Submit Button
        submitButton: xpathSelector("//*[@id='add']"),

        //Default first 10 ads on page.
        ads: xpathSelector("//*[@class='td-info']"),
    },
    data: {

        launch_url: 'https://www.netinfo.md/',
        pageUrl: '/ads',
        titleMain: 'Netinfo',
        image: [
            'testing_1.jpg',
            'testing_2.jpg',
            'testing_3.jpg',
            'testing_4.jpg',
            'testing_5.jpg',
            'testing_6.jpg',
            'testing_7.jpg',
            'testing_8.jpg',
            'testing_9.jpg',
            'testing_10.jpg',
            'testing_11.jpg',
            'testing_12.jpg']
    }
};
