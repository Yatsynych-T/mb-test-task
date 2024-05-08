Instructions to run the project.

1. Clone the Repository:
   Clone the repository mb-test-task to your local machine.
   
2. Make sure that Node.js and npm are installed on your machine.
   
3. Install Dependencies:
   Navigate to the project directory in your terminal and run the following commands to install the required dependencies from the package.json file:
   npm install
   npm i --save-dev @playwright/test
   npx playwright install chromium
   npx playwright install firefox
   
4. Run the Test Script:
   After dependencies installation, run the following test script to execute tests in Chrome and Firefox:
   npm run testChromeFirefox
