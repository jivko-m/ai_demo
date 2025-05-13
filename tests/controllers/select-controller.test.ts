import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { ReactiveControllerHost } from 'lit';
import { SelectController } from '../../src/controllers/select-controller';

// Mock host class that implements the necessary properties and methods
class MockSelectHost implements ReactiveControllerHost {
  name = '';
  text = '';
  dataSource: any[] = [];
  displayMember?: string;
  valueMember?: string;
  value: any = null;
  disabled = false;
  required = false;
  readonly = false;
  nullable = false;
  selectedIndex = 0;
  selectedItem?: any;

  raiseEvent = vi.fn().mockReturnValue(true);
  querySelectorAll = vi.fn().mockReturnValue([]);
  shadowRoot = {
    querySelector: vi.fn()
  };

  // ReactiveControllerHost methods
  addController = vi.fn();
  removeController = vi.fn();
  requestUpdate = vi.fn();
  updateComplete = Promise.resolve(true);
}

describe('SelectController', () => {
  let host: MockSelectHost;
  let controller: SelectController;
  let mockSelect: HTMLSelectElement;

  beforeEach(() => {
    // Create a fresh host for each test
    host = new MockSelectHost();

    // Create a mock select element
    mockSelect = document.createElement('select');
    vi.spyOn(mockSelect, 'setCustomValidity');
    vi.spyOn(mockSelect, 'checkValidity').mockReturnValue(true);

    // Mock the shadowRoot.querySelector to return the mock select
    host.shadowRoot.querySelector = vi.fn().mockReturnValue(mockSelect);

    // Create the controller with the host
    controller = new SelectController(host);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should register itself with the host', () => {
    expect(host.addController).toHaveBeenCalledWith(controller);
  });

  test('should process ctrl-option elements when present', () => {
    // Create mock option elements
    const option1 = document.createElement('div');
    option1.setAttribute('value', 'value1');
    option1.textContent = 'Option 1';

    const option2 = document.createElement('div');
    option2.setAttribute('value', 'value2');
    option2.setAttribute('selected', '');
    option2.textContent = 'Option 2';

    // Mock querySelectorAll to return the options
    host.querySelectorAll = vi.fn().mockReturnValue([option1, option2]);

    // Call hostFirstUpdated
    controller.hostFirstUpdated(host.shadowRoot as unknown as ShadowRoot);

    // Verify dataSource was set correctly
    expect(host.dataSource).toEqual([
      { value: 'value1', label: 'Option 1', selected: false },
      { value: 'value2', label: 'Option 2', selected: true }
    ]);

    // Verify other properties were set
    expect(host.valueMember).toBe('value');
    expect(host.displayMember).toBe('label');
    expect(host.selectedIndex).toBe(1); // Second option is selected
  });

  test('should add options to the select element', () => {
    // Set up test data
    host.dataSource = [
      { value: 'value1', label: 'Option 1' },
      { value: 'value2', label: 'Option 2' }
    ];
    host.valueMember = 'value';
    host.displayMember = 'label';

    // Create a real select element for this test
    const realSelect = document.createElement('select');
    host.shadowRoot.querySelector = vi.fn().mockReturnValue(realSelect);
    controller.hostFirstUpdated(host.shadowRoot as unknown as ShadowRoot);

    // Call the method
    controller.addOptions();

    // Verify options were added
    expect(realSelect.children.length).toBe(2);
    expect(realSelect.children[0].getAttribute('value')).toBe('value1');
    expect(realSelect.children[0].textContent).toBe('Option 1');
    expect(realSelect.children[1].getAttribute('value')).toBe('value2');
    expect(realSelect.children[1].textContent).toBe('Option 2');
  });

  test('should clear options from the select element', () => {
    // Create a real select element for this test
    const realSelect = document.createElement('select');
    const option = document.createElement('option');
    option.textContent = 'Test';
    realSelect.appendChild(option);

    // Verify the option was added
    expect(realSelect.children.length).toBe(1);

    // Update the controller to use the real select
    host.shadowRoot.querySelector = vi.fn().mockReturnValue(realSelect);
    controller.hostFirstUpdated(host.shadowRoot as unknown as ShadowRoot);

    // Call the method
    controller.clearOptions();

    // Verify options were cleared
    expect(realSelect.children.length).toBe(0);
  });

  test('should handle change events', () => {
    // Set up test data
    host.dataSource = [
      { value: 'value1', label: 'Option 1' },
      { value: 'value2', label: 'Option 2' }
    ];
    host.valueMember = 'value';
    host.displayMember = 'label';

    // Create a mock event
    const mockEvent = {
      target: {
        selectedIndex: 1
      }
    } as unknown as Event;

    // Call the method
    controller.handleChange(mockEvent);

    // Verify the host properties were updated
    expect(host.selectedIndex).toBe(1);
    expect(host.selectedItem).toEqual({ value: 'value2', label: 'Option 2' });
    expect(host.value).toBe('value2');

    // Verify raiseEvent was called
    expect(host.raiseEvent).toHaveBeenCalledWith('change', host.selectedItem);
  });

  test('should set selected item based on value', () => {
    // Set up test data
    host.dataSource = [
      { value: 'value1', label: 'Option 1' },
      { value: 'value2', label: 'Option 2' }
    ];
    host.valueMember = 'value';
    host.value = 'value2';

    // Call the method
    controller.setSelected();

    // Verify the host properties were updated
    expect(host.selectedIndex).toBe(1);
    expect(host.selectedItem).toEqual({ value: 'value2', label: 'Option 2' });

    // Verify raiseEvent was called
    expect(host.raiseEvent).toHaveBeenCalledWith('value-changed');
  });

  test('should set selected item based on selectedIndex when value is null', () => {
    // Set up test data
    host.dataSource = [
      { value: 'value1', label: 'Option 1' },
      { value: 'value2', label: 'Option 2' }
    ];
    host.valueMember = 'value';
    host.value = null;
    host.selectedIndex = 1;

    // Call the method
    controller.setSelected();

    // Verify the host properties were updated
    expect(host.selectedItem).toEqual({ value: 'value2', label: 'Option 2' });
    expect(host.value).toBe('value2');

    // Verify raiseEvent was called
    expect(host.raiseEvent).toHaveBeenCalledWith('value-changed');
  });

  test('should clear selection', () => {
    // Set up initial state
    host.selectedIndex = 1;
    host.selectedItem = { value: 'value2', label: 'Option 2' };
    host.value = 'value2';

    // Call the method
    controller.clearSelection();

    // Verify the host properties were updated
    expect(host.selectedIndex).toBe(-1);
    expect(host.selectedItem).toBeNull();
    expect(host.value).toBeNull();
  });

  test('should delegate validation methods to the select element', () => {
    // Create a real select element for this test
    const realSelect = document.createElement('select');
    vi.spyOn(realSelect, 'setCustomValidity');
    vi.spyOn(realSelect, 'checkValidity').mockReturnValue(true);

    // Update the controller to use the real select
    host.shadowRoot.querySelector = vi.fn().mockReturnValue(realSelect);
    controller.hostFirstUpdated(host.shadowRoot as unknown as ShadowRoot);

    // Test willValidate
    expect(controller.willValidate).toBe(true);

    // Test setCustomValidity
    controller.setCustomValidity('Error message');
    expect(realSelect.setCustomValidity).toHaveBeenCalledWith('Error message');

    // Test checkValidity
    expect(controller.checkValidity()).toBe(true);
    expect(realSelect.checkValidity).toHaveBeenCalled();

    // Test validity
    expect(controller.validity).toBe(realSelect.validity);

    // Test validationMessage
    expect(controller.validationMessage).toBe(realSelect.validationMessage);
  });

  test('should update when dataSource changes', () => {
    // Spy on methods
    vi.spyOn(controller, 'setSelected');
    vi.spyOn(controller, 'addOptions');

    // Create a mock changedProperties map
    const changedProperties = new Map();
    changedProperties.set('dataSource', []);

    // Call the method
    controller.hostUpdated(changedProperties);

    // Verify methods were called
    expect(controller.setSelected).toHaveBeenCalled();
    expect(controller.addOptions).toHaveBeenCalled();
  });

  test('should update when readonly changes', () => {
    // Spy on methods
    vi.spyOn(controller, 'addOptions');

    // Create a mock changedProperties map
    const changedProperties = new Map();
    changedProperties.set('readonly', false);

    // Call the method
    controller.hostUpdated(changedProperties);

    // Verify methods were called
    expect(controller.addOptions).toHaveBeenCalled();
  });

  test('should update when value or selectedIndex changes', () => {
    // Spy on methods
    vi.spyOn(controller, 'setSelected');

    // Set up test data
    host.selectedIndex = 1;

    // Create a mock changedProperties map
    const changedProperties = new Map();
    changedProperties.set('value', 'oldValue');

    // Call the method
    controller.hostUpdated(changedProperties);

    // Verify methods were called
    expect(controller.setSelected).toHaveBeenCalled();
    expect(host.raiseEvent).toHaveBeenCalledWith('value-changed');
  });
});
