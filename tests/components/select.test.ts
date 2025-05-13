import {describe, test, expect, beforeAll, afterAll} from 'vitest';
import {html, fixture, fixtureCleanup } from '@open-wc/testing-helpers';

// Import the component
import { CtrlSelect } from '../../src/components/select';

describe('ctrl-select component', () => {
  let countries: { id: number, name: string }[] = [];

  beforeAll(() => {
    countries = [
      { id: 1, name: "United States" },
      { id: 2, name: "Canada" },
      { id: 3, name: "United Kingdom" },
      { id: 4, name: "France" },
      { id: 5, name: "Germany" },
      { id: 6, name: "Japan" },
      { id: 7, name: "Australia" },
      { id: 8, name: "Brazil" },
      { id: 9, name: "China" },
      { id: 10, name: "India" }
    ];
  });

  afterAll(() => {
    countries = [];
    fixtureCleanup();

  });

  test('should render with default state', async () => {

    const select = await fixture(html`<ctrl-select
        .dataSource="${countries}"
        value-member="id"
        display-member="name"
        selected-index="3">
    </ctrl-select>`) as CtrlSelect;

    // Check that the component is visible
    expect(select).not.toBeNull();
    expect(select.value).toBe(4);
    expect(select.selectedItem.name).toBe('France');
  });

  test('should handle nullable values', async () => {
    const select = await fixture(html`<ctrl-select
        .dataSource="${countries}"
        value-member="id"
        display-member="name">
    </ctrl-select>`) as CtrlSelect;

    // Set nullable property directly
    select.nullable = true;
    await select.updateComplete;

    // Debug logging
    console.log('Nullable test - value:', select.value);
    console.log('Nullable test - selectedItem:', select.selectedItem);
    console.log('Nullable test - selectedIndex:', select.selectedIndex);
    console.log('Nullable test - nullable:', select.nullable);
    console.log('Nullable test - dataSource:', select.dataSource);

    // Clear selection to ensure value is null
    select.clearSelection();
    await select.updateComplete;

    // Verify initial state
    expect(select.value).toBeNull();
    expect(select.selectedItem).toBeNull();

    // Select a value and verify
    select.selectedIndex = 2;
    await select.updateComplete;

    // Debug logging after setting selectedIndex
    console.log('After setting selectedIndex - value:', select.value);
    console.log('After setting selectedIndex - selectedItem:', select.selectedItem);
    console.log('After setting selectedIndex - selectedIndex:', select.selectedIndex);
    console.log('After setting selectedIndex - _value:', select._value);

    expect(select.value).toBe(3);
    expect(select.selectedItem.name).toBe('United Kingdom');

    // Clear selection and verify
    select.selectedIndex = -1;
    await select.updateComplete;
    expect(select.value).toBeNull();
    expect(select.selectedItem).toBeNull();
  });
});
