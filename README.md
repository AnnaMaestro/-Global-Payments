
# E-Commerce Automated Testing Project

This project demonstrates a complete end-to-end automated testing solution for an e-commerce website using the NodeJS stack, TypeScript, WebDriverIO, and Cucumber. The project automates the following steps on the Magento Software Testing Board website:
1. Access https://magento.softwaretestingboard.com/.
2. Access the Shop.
3. Filter for a Certain Category (e.g., JavaScript).
4. Open the Product Page.
5. Add Multiple Quantities of the Product to the Cart.
6. Perform a Checkout.

## Tech Stack
The provided stack ensures efficient and maintainable automated testing with a behavior-driven development (BDD) approach using Cucumber.
1. NodeJS: Node.js is a runtime environment that allows running JavaScript code outside of a browser, making it ideal for test automation.
2.TypeScript: TypeScript is a statically-typed superset of JavaScript, enhancing code quality and maintainability by providing type checking and improved tooling.
3. WebDriverIO: WebDriverIO is a popular automation framework for web applications. It provides extensive features for automating web interactions, finding elements, and making assertions.
4. Cucumber: Cucumber is a BDD tool for writing tests in plain language, enabling collaboration between technical and non-technical team members.

## Installation
1. NodeJS: Ensure Node.js is installed on your machine. You can download and install it from the official website: https://nodejs.org/.
2. Clone the Repository: Clone this repository to your local machine using Git.
git clone https://github.com/AnnaMaestro/Global-Payments.git
3. Install Dependencies: Navigate to the project directory and install the project dependencies using npm:
cd project-directory
npm install

## Project Structure
1. features/: 
    - checkout.feature: Contains Cucumber feature files that describe test scenarios using Gherkin syntax.
2. features/step-definitions/: Contains TypeScript files with step definitions, where you implement actions for each step in your feature files.
    - helper.ts: contains the custom common functions 
    - steps.ts: positive and negative test cases and test steps
3. node_modules/: Contains project dependencies managed by npm.
4. wdio.conf.js: The WebDriverIO configuration file, where you specify settings and options for your tests.
5. src/:
    - automation.ts: contains script for the basic positive flow 
    
## Running Tests
For running the tests you might use the following commands:
1. For running the basic positive path defined in the src/automation.ts file you will need to run:
``` npm start
This will run the test script using webdriver.io test runner.
2. For running detailed test cases defined in step_definitions/steps.ts you will need to run the following command:
``` npm run test
```

Happy testing!

