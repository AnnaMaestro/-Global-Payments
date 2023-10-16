import { remote } from "webdriverio";
import { automationFunction } from "./src/automation";

(async () => {
  const browser = await remote({
    capabilities: {
      browserName: 'chrome'
    }
  });

  try {
    await automationFunction(browser);
  } finally {
    await browser.deleteSession();
  }
})();
