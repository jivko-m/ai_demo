import { test, expect } from '@playwright/test';

test.describe('ctrl-select component', () => {
  test('should render with default state', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/tests/browser/select-test-page.html');

    // Wait for the component to be loaded
    await page.waitForSelector('#test-select');

    // Check that the component is visible
    const select = await page.locator('#test-select');
    expect(await select.isVisible()).toBe(true);
  });

  test('should display selected option', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/tests/browser/select-test-page.html');

    // Wait for the component to be loaded
    await page.waitForSelector('#test-select');

    // Check the initial selected text
    const selectText = await page.locator('#test-select .ctrl-text').textContent();
    expect(selectText).toContain('Option 1');

    // Click the select to open the dropdown
    await page.locator('#test-select').click();

    // Select the second option
    await page.selectOption('#test-select select', { index: 1 });

    // Check that the selected text has updated
    const updatedText = await page.locator('#test-select .ctrl-text').textContent();
    expect(updatedText).toContain('Option 2');
  });

  test('should handle disabled state', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/tests/browser/select-test-page.html');

    // Wait for the component to be loaded
    await page.waitForSelector('#disabled-select');

    // Check that the component has the disabled attribute
    const select = await page.locator('#disabled-select');
    expect(await select.getAttribute('disabled')).not.toBeNull();

    // Try to click the select (should not trigger any change)
    await select.click();

    // Verify that the select didn't change
    const selectText = await page.locator('#disabled-select .ctrl-text').textContent();
    expect(selectText).toContain('Disabled Select');
  });

  test('should handle readonly state', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/tests/browser/select-test-page.html');

    // Wait for the component to be loaded
    await page.waitForSelector('#readonly-select');

    // Check that the component has the readonly attribute
    const select = await page.locator('#readonly-select');
    expect(await select.getAttribute('readonly')).not.toBeNull();

    // Verify that the select element is not rendered in readonly mode
    const selectElement = await page.locator('#readonly-select select');
    expect(await selectElement.count()).toBe(0);
  });

  test('should fire change event when selection changes', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/tests/browser/select-test-page.html');

    // Wait for the component to be loaded
    await page.waitForSelector('#test-select');

    // Set up event listener
    await page.evaluate(() => {
      window.lastEvent = null;
      document.querySelector('#test-select')?.addEventListener('change', (e) => {
        window.lastEvent = 'change';
      });
    });

    // Click the select to open the dropdown
    await page.locator('#test-select').click();

    // Select the second option
    await page.selectOption('#test-select select', { index: 1 });

    // Check that the event was fired
    const eventFired = await page.evaluate(() => window.lastEvent);
    expect(eventFired).toBe('change');
  });

  test('should handle nullable selection', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/tests/browser/select-test-page.html');

    // Wait for the component to be loaded
    await page.waitForSelector('#nullable-select');

    // Click the select to open the dropdown
    await page.locator('#nullable-select').click();

    // Select the empty option (first option in nullable select)
    await page.selectOption('#nullable-select select', { index: 0 });

    // Check that the selected text is empty
    const selectText = await page.locator('#nullable-select .ctrl-text').textContent();
    expect(selectText?.trim()).toBe('');
  });
});
