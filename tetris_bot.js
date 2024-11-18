const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Navigate to Tetris.com
    await page.goto('https://tetris.com');

    // Wait for the game canvas to load
    await page.waitForSelector('canvas');
    console.log('Game loaded! Starting automation...');

    // Simulate random moves
    const randomMove = async () => {
        const moves = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
        const randomKey = moves[Math.floor(Math.random() * moves.length)];
        await page.keyboard.press(randomKey);
    };

    // Automate random key presses every 500ms
    const playGame = setInterval(async () => {
        try {
            await randomMove();
        } catch (error) {
            console.error('Error:', error);
            clearInterval(playGame);
        }
    }, 500);

    // Stop the game after 1 minute
    setTimeout(() => {
        clearInterval(playGame);
        console.log('Stopping the game...');
        browser.close();
    }, 60000);
})();
