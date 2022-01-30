const { openBrowser, goto, below, textBox, into, write, click, clear, text, closeBrowser } = require('taiko');
const assert = require("assert");

(async () => {
    try {
        await openBrowser();
        await goto('http://localhost:3000/');
        await write('email@example.com',into(textBox(below('EMAIL'))));
        await write('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae',into(textBox(below('MESSAGE'))));
        await click('Add');
        await clear(textBox(below('EMAIL')));
        await clear(textBox(below('MESSAGE')));
        await write('abc@example.com',into(textBox(below('EMAIL'))));
        await write('aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae',into(textBox(below('MESSAGE'))));
        await click('Add');
        await clear(textBox(below('EMAIL')));
        await clear(textBox(below('MESSAGE')));

        assert.ok(text('email@example.com').exists());
        assert.ok(text('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae').exists());
        assert.ok(text('abc@example.com').exists());
        assert.ok(text('aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae').exists());

        await click('Clear all messages');
        await clear(textBox(below('MESSAGE')));
        await clear(textBox(below('EMAIL')));

        assert.ok(text('email@example.com').exists(0,0),false);
        assert.ok(text('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae').exists(0,0),false);
        assert.ok(text('abc@example.com').exists(0,0),false);
        assert.ok(text('aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae').exists(0,0),false);

    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
