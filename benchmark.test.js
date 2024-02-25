const { test, expect } = require('@playwright/test')

test('Run Benchmark and check for results', async ({ page }) => {
    await page.goto("https://devmirza-bot.github.io/frameworks-benchmark/")

    await page.click('#run-benchmark-btn')

    await page.waitForSelector(".result")

    const results = await page.$$eval(".result", (elements) => elements.map((element) => element.textContent.trim()))

    expect(results.length).toBeGreaterThan(0)
})