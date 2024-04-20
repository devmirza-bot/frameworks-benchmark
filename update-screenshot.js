const puppeter = require("puppeteer");
const fs = require("fs");

async function takeScreenShot(url, path) {
  // Launch the Broser
  const browser = await puppeter.launch();
  // Go to new page
  const page = await browser.newPage();
  // wait for to go to the url
  await page.goto(url);
  // took screenshot of the website and store it
  await page.screencast({ path });
  // Close the browser
  await browser.close();
}

// Function to update the README.md with the latest screenshot
async function updateReadmeWithScreenShot(screenshotPath) {
  const readmeFilePath = "README.md";
  const newLine = "\n";
  const screenshotMarkdown = ``;

  fs.readFile(readmeFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading README fike:", err);
      return;
    }

    // Replace existing screenshot markdown
    const updateReadme = data.replace(
      /!\[Website Screenshot\]\(.*\)/,
      screenshotMarkdown
    );

    // Write updated content back to README file
    fs.writeFile(readmeFilePath, updateReadme, "utf-8", (err) => {
      if (err) {
        console.error("Error writing to README file:".err);
      }

      console.log("README file updated with new screenshot");
    });
  });
}

const websiteURL = "https://devmirza-bot.github.io/frameworks-benchmark/";
const screenshotPath = "screenshot.png";

takeScreenShot(websiteURL, screenshotPath)
  .then(() => updateReadmeWithScreenShot(screenshotPath))
  .catch((err) => console.error("Error:", err));
