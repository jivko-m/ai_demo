import { test, expect } from '@playwright/test';

test.describe('render-if directive', () => {
  test('should conditionally render content based on state', async ({ page }) => {
    // Navigate to the test page
    await page.goto('/tests/browser/test-page.html');
    
    // Wait for the component to be loaded
    await page.waitForSelector('test-component');
    
    // Initially, the conditional content should not be visible
    const initialContent = await page.locator('#conditional-content').count();
    expect(initialContent).toBe(0);
    
    // Click the toggle button to show the content
    await page.locator('#toggle-button').click();
    
    // Now the conditional content should be visible
    await page.waitForSelector('#conditional-content');
    const visibleContent = await page.locator('#conditional-content').textContent();
    expect(visibleContent).toBe('Conditional Content');
    
    // Click the toggle button again to hide the content
    await page.locator('#toggle-button').click();
    
    // The conditional content should be hidden again
    const hiddenContent = await page.locator('#conditional-content').count();
    expect(hiddenContent).toBe(0);
  });
});