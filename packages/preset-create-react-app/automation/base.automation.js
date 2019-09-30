const port = 4444;
const host = `http://0.0.0.0:${port}`;

describe('@storybook/preset-create-react-app', () => {
  it('should render a button with content from .env', async () => {
    await page.goto(`${host}/iframe.html?id=components-button--default`);
    await page.waitForSelector('button');
    const button = await page.$('button');
    await expect(button).toMatch('Hello world');
  });

  it('should render an SVG from a file', async () => {
    await page.goto(`${host}/iframe.html?id=components-logo--default`);
    await page.waitForSelector('svg');
    const svg = await page.$('svg');
    const title = await svg.$('title');
    await expect(title).toMatch('Test title');
  });
});
