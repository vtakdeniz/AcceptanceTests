/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    below
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Open Application", async () => {
    await goto('localhost:3000');
});

step("Add items to basket", async () => {
        
        await click('Add To Basket',below('Garden Hose'));
        await click('Add To Basket',below('Wooden dinner table'));
        await click('Add To Basket',below('Iphone 13'));
    }
);

step("Check basket", async () => {
        await click('Basket');
        assert.ok(text('Garden Hose').exists());
        assert.ok(text('Wooden dinner table').exists());
        assert.ok(text('Iphone 13').exists());
    }
);

