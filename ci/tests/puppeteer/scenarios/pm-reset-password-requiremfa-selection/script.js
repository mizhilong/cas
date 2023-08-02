const puppeteer = require('puppeteer');
const cas = require('../../cas.js');

(async () => {
    const browser = await puppeteer.launch(cas.browserOptions());
    const page = await cas.newPage(browser);
    await cas.goto(page, "https://localhost:8443/cas/login");
    await page.waitForTimeout(2000);
    await cas.assertInnerText(page, "#forgotPasswordLink", "Reset your password");
    await cas.click(page, "#forgotPasswordLink");
    await page.waitForTimeout(2000);

    await cas.type(page,'#username', "casuser");
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await page.waitForTimeout(1000);
    await cas.screenshot(page);

    await cas.assertVisibility(page, '#mfa-gauth');
    await cas.assertVisibility(page, '#mfa-simple');

    console.log("Selecting mfa-gauth");
    await cas.submitForm(page, "#mfa-gauth > form[name=fm1]");
    await page.waitForTimeout(1000);

    let scratch = await cas.fetchGoogleAuthenticatorScratchCode();
    console.log(`Using scratch code ${scratch} to login...`);
    await cas.type(page,'#token', scratch);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    await cas.screenshot(page);
    await page.waitForTimeout(1000);
    await cas.assertInnerText(page, "#content h2", "Password Reset Instructions Sent Successfully.");
    await cas.assertInnerTextStartsWith(page, "#content p", "You should shortly receive a message");

    await browser.close();
})();