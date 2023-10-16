import assert from 'assert';

export const verifyUrl = async (browser: any, expectedUrl: string) => {
  const currentUrl = await browser.getUrl();
  assert.equal(expectedUrl, currentUrl, 'URL mismatch');
}

export const verifyTitle = async (browser: any, expectedTitle: string) => {
  const currentTitle = await browser.getTitle();
  assert.equal(expectedTitle, currentTitle, 'Title mismatch');
}
