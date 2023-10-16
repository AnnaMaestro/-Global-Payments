import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { assert } from 'chai';
import { remote } from 'webdriverio';
import { performCheckoutActions } from "../../src/automation"
import { verifyUrl, verifyTitle } from "./helper"

let browser: any;
setDefaultTimeout(40 * 1000);

Before(async function () {
  browser = await remote({
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu']
      }
    }
  });
});

//Scenario 1:
Given('I am on the home page', async function () {
  await browser.url('https://magento.softwaretestingboard.com/');
  const expectedUrl = 'https://magento.softwaretestingboard.com/';
  await verifyUrl(browser, expectedUrl);
});

When('I access the shop', async function () {
  const shopButton = await browser.$('span.action.more.button');
  await shopButton.click();
});

Then('I should see the shop page', async function () {
  const expectedTitle = 'New Luma Yoga Collection';
  await verifyTitle(browser, expectedTitle);
});

When('I filter for a category', async function () {
  const categoryFilterButton = await browser.$('//div[text()="Category"]');
  await categoryFilterButton.click();
  const electronicCategoryLink = await browser.$(`a[href="https://magento.softwaretestingboard.com/collections/yoga-new.html?category_gear=86"]`);
  await electronicCategoryLink.click();
});

Then('I should see the category page', async function ()  {
  const expectedUrl = 'https://magento.softwaretestingboard.com/collections/yoga-new.html?category_gear=86';
  await verifyUrl(browser, expectedUrl);
});

When('I open a specific product page', async function () {
  const productPage = await browser.$(`img[src="https://magento.softwaretestingboard.com/pub/media/catalog/product/cache/7c4c1ed835fbbf2269f24539582c6d44/w/g/wg02-bk-0.jpg"]`);
  await productPage.click();
});

Then('I should see the product page', async function () {
  const expectedTitle = 'Didi Sport Watch';
  await verifyTitle(browser, expectedTitle);
});

When('I add the product to the cart', async function () {
  const addToCartButton = await browser.$('button#product-addtocart-button');
  await addToCartButton.click();
  await browser.pause(10000)
});

Then('I proceed to checkout', async function () {
  const myCartLink = await browser.$('a.action.showcart');
  await myCartLink.click();
  await browser.pause(10000);

  const checkoutButton = await browser.$('button.action.primary.checkout');
  await checkoutButton.click();
  await browser.pause(10000);

  const expectedUrl = 'https://magento.softwaretestingboard.com/checkout/#shipping';
  await verifyUrl(browser, expectedUrl);
});

Then('I perform the checkout', async function () {
  await performCheckoutActions(browser);
  const expectedUrl = 'https://magento.softwaretestingboard.com/checkout/#payment';
  await verifyUrl(browser, expectedUrl);
});

Then('I review and confirm the payment', async function () {
  const checkbox = await browser.$('input[name="billing-address-same-as-shipping"]');
  await checkbox.click();
});

Then('I place the order', async function () {
  const checkbox = await browser.$('span[data-bind="i18n: \'Place Order\'"]');
  await checkbox.click();
});

//Scenario 2:
Given('I am on an unexpected home page', async function () {
  await browser.url('https://example.com/unexpected');
  const unexpectedUrl = 'https://example.com/unexpected';
  const currentUrl = await browser.getUrl();
  assert.equal(currentUrl, unexpectedUrl, 'Redirected to an unexpected page');
});

When('I access the wrong shop', async function () {
  const wrongShopButton = await browser.$('span.action.wrongg.button');
  assert.strictEqual(wrongShopButton.length, undefined);
});

Then('I should not see the shop page', async function () {
  const pageTitle = await browser.getTitle();
  const expectedTitle = 'Shop';
  assert(!pageTitle.includes(expectedTitle), 'Unexpected behavior');
});

When('I filter for a non-existent category', async function () {
  const categoryFilterButton = await browser.$('//div[text()="Summer"]');
  assert.strictEqual(categoryFilterButton.length, undefined);
});

Then('I should not see the category page', async function () {
  const unexpectedUrl = 'https://magento.softwaretestingboard.com/collections/yoga-new.html?category_gear=86';
  const currentUrl = await browser.getUrl();
  assert.notEqual(unexpectedUrl, currentUrl, 'Unexpectedly found the category page');
});

Then('I should not access a specific product page', async function () {
  const productPage = await browser.$(`img[src="https://magento.softwaretestingboard.com/7c4c1ed835fbbf2269fd44.jpg"]`);
  assert.strictEqual(productPage.length, undefined);
});

When('I proceed to checkout without adding any items to the cart', async function () {
  const checkoutButton = await browser.$('button.action.primary.checkout');
  assert.strictEqual(checkoutButton.length, undefined);
});

Then('I attempt to perform the checkout', async function () {
  await performCheckoutActions(browser);
  const unexpectedUrl = 'https://magento.softwaretestingboard.com/checkout/#payment';
  const currentUrl = await browser.getUrl();
  assert.notStrictEqual(currentUrl, unexpectedUrl);
});

Then('I attempt place the order', async function () {
  const checkbox = await browser.$('span[data-bind="i18n: \'Place Order\'"]');
  assert.strictEqual(checkbox.length, undefined, 'The place order button is present, but it should not be.');
});

After(async function () {
  await browser.deleteSession();
});