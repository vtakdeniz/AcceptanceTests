// REPO : https://github.com/vtakdeniz/Guest-ledger-book

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
    below,
    clear
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
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

step("Go to guest ledger book page", async () => {
    await goto('localhost:3000');
});


step("Add messages", async () => {
    await write('email@example.com',into(textBox(below('EMAIL'))));
    await write('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae',into(textBox(below('MESSAGE'))));
    await click('Add');
    await clear(textBox(below('EMAIL')));
    await clear(textBox(below('MESSAGE')));
    await write('abc@example.com',into(textBox(below('EMAIL'))));
    await write('aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae',into(textBox(below('MESSAGE'))));
    await click('Add');
})

step("Clear text boxes", async () => {
    await clear(textBox(below('EMAIL')));
    await clear(textBox(below('MESSAGE')));
})

step("Check if messages exists", async () => {
    assert.ok(text('email@example.com').exists());
    assert.ok(text('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae').exists());
    assert.ok(text('abc@example.com').exists());
    assert.ok(text('aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae').exists());
})

step("Click clear all messages button", async () => {
    await click('Clear all messages');
})

step("Assert messages don't exists anymore", async () => {
    assert.ok(text('email@example.com').exists(0,0),false);
    assert.ok(text('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae').exists(0,0),false);
    assert.ok(text('abc@example.com').exists(0,0),false);
    assert.ok(text('aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae').exists(0,0),false);
})

