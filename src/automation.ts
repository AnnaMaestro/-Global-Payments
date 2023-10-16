import { baseUrl } from "../config";

export async function automationFunction(browser: any) {
  let productQuantity = 3;

  console.log('Accessing the website...');
  await browser.url(baseUrl);
  console.log('Website accessed successfully!');

  //Access the Shop
  const shopButton = await browser.$('span.action.more.button');
  await clickElement(shopButton);

  //Filter for a category
  const categoryFilterButton = await browser.$('//div[text()="Category"]');
  await clickElement(categoryFilterButton);

  const electronicCategoryLink = await browser.$(`a[href="${baseUrl}collections/yoga-new.html?category_gear=86"]`);
  await clickElement(electronicCategoryLink);

  // Open the Product Page
  const productPage = await browser.$(`img[src="${baseUrl}pub/media/catalog/product/cache/7c4c1ed835fbbf2269f24539582c6d44/w/g/wg02-bk-0.jpg"]`);
  await clickElement(productPage);

  // Add multiple quantities of the product to the cart
  const quantityInput = await browser.$('input#qty');
  await clearAndSetValue(quantityInput, productQuantity);
  const addToCartButton = await browser.$('button#product-addtocart-button');
  await clickElement(addToCartButton);
  await browser.pause(5000);

  // Perform Checkout
  const myCartLink = await browser.$('a.action.showcart');
  await clickElement(myCartLink);
  await browser.pause(10000);

  const checkoutButton = await browser.$('button.action.primary.checkout');
  await clickElement(checkoutButton);
  await browser.pause(10000);

  await performCheckoutActions(browser);

  // Review and Payment
  const checkbox = await browser.$('input[name="billing-address-same-as-shipping"]');
  await clickElement(checkbox);

  // Place Order
  const placeOrderButton = await browser.$('span[data-bind="i18n: \'Place Order\'"]');
  await clickElement(placeOrderButton);
  await browser.pause(5000);

  // Continue Shopping
  const continueShoppingButton = await browser.$('a.action.primary.continue');
  await clickElement(continueShoppingButton);
}

const clickElement = async (element: any) => {
  await element.waitForClickable({ timeout: 10000 });
  await element.click();
};

const selectByVisibleText = async (element: any, text: any) => {
  await element.selectByVisibleText(text);
  console.log(`Selected '${text}'`);
};

const clearAndSetValue = async (element: any, value: any) => {
await element.waitForDisplayed({ timeout: 10000 });
await element.clearValue();
await element.setValue(value);
};

const performNextAction = async (browser: any) => {
const nextButton = await browser.$('button[data-role="opc-continue"]');
await clickElement(nextButton);
await browser.pause(10000);
};

// Perform checkout actions
export const performCheckoutActions = async (browser: any) => {
  try {
    const emailInput = await browser.$('input#customer-email');
    await clearAndSetValue(emailInput, 'test123@gmail.com');

    const passwordInput = await browser.$('input#customer-password');
    await clearAndSetValue(passwordInput, 'Test12345');

    const firstNameInput = await browser.$('input[name="firstname"]');
    await clearAndSetValue(firstNameInput, 'Anna');

    const lastNameInput = await browser.$('input[name="lastname"]');
    await clearAndSetValue(lastNameInput, 'Mack');

    const companyInput = await browser.$('input[name="company"]');
    await clearAndSetValue(companyInput, 'Megento');

    const addressInput = await browser.$('input[name="street[0]"]');
    await clearAndSetValue(addressInput, '1234 Street, City, State, Country, 12345');

    const cityInput = await browser.$('input[name="city"]');
    await clearAndSetValue(cityInput, 'XYZ');
    await browser.pause(10000);

    const selectElement = await browser.$('select[name="region_id"]');
    await selectByVisibleText(selectElement, 'California');

    const postcodeInput = await browser.$('input[name="postcode"]');
    await clearAndSetValue(postcodeInput, '12345');

    const countrySelectElement = await browser.$('select[name="country_id"]');
    await selectByVisibleText(countrySelectElement, 'United States');

    const telephoneInput = await browser.$('input[name="telephone"]');
    await clearAndSetValue(telephoneInput, '12345678');

    const tableRateRadioButton = await browser.$('input[type="radio"][value="tablerate_bestway"]');
    await clickElement(tableRateRadioButton);

    await performNextAction(browser);
  } catch (error) {
    console.error('An error occurred during checkout:', error);
  }
};
