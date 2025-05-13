﻿import {describe, test, expect, beforeAll, afterAll} from 'vitest';
import {html, fixture, fixtureCleanup } from '@open-wc/testing-helpers';

// Import the component
import { CtrlSelect } from '../../src/components/select.ts';

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
        display-member="name"
        nullable>
    </ctrl-select>`) as CtrlSelect;
  
    // Verify initial state
    expect(select.value).toBeNull();
    expect(select.selectedItem).toBeNull();
  
    // Select a value and verify
    select.selectedIndex = 2;
    await select.updateComplete;
    expect(select.value).toBe(3);
    expect(select.selectedItem.name).toBe('United Kingdom');

    // Clear selection and verify
    select.selectedIndex = -1;
    await select.updateComplete;
    expect(select.value).toBeNull();
    expect(select.selectedItem).toBeNull();
  });
});

