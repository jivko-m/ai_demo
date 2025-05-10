import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ReactiveControllerHost } from 'lit';
import { ButtonController } from '../../src/controllers/button-controller';

// Mock host class that implements the necessary properties and methods
class MockButtonHost implements ReactiveControllerHost {
  disabled = false;
  type = '';
  action = '';
  path = '';

  raiseEvent = vi.fn().mockReturnValue(true);
  addEventListener = vi.fn();
  appendChild = vi.fn();

  // ReactiveControllerHost methods
  addController = vi.fn();
  removeController = vi.fn();
  requestUpdate = vi.fn();
  updateComplete = Promise.resolve(true);
}

describe('ButtonController', () => {
  let host: MockButtonHost;
  let controller: ButtonController;

  beforeEach(() => {
    // Create a fresh host for each test
    host = new MockButtonHost();

    // Spy on host methods
    vi.spyOn(host, 'addEventListener');
    vi.spyOn(host, 'appendChild');

    // Create the controller with the host
    controller = new ButtonController(host);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should register itself with the host and add click event listener', () => {
    // The controller should add itself to the host
    expect(host.addEventListener).toHaveBeenCalledWith(
      'click', 
      expect.any(Function), 
      { capture: true }
    );
  });

  it('should create a submit button when type is "submit"', () => {
    // Set the type to submit
    host.type = 'submit';

    // Call hostFirstUpdated to trigger submit button creation
    controller.hostFirstUpdated();

    // Verify that a button was appended to the host
    expect(host.appendChild).toHaveBeenCalledWith(expect.any(HTMLButtonElement));

    // Verify the button has the correct type
    const button = host.appendChild.mock.calls[0][0] as HTMLButtonElement;
    expect(button.type).toBe('submit');

    // Verify the button has the correct style
    expect(button.style.position).toBe('fixed');
    expect(button.style.left).toBe('-999px');
    expect(button.style.top).toBe('-999px');
  });

  it('should not create a submit button when type is not "submit"', () => {
    // Set the type to something other than submit
    host.type = 'button';

    // Call hostFirstUpdated to trigger submit button creation
    controller.hostFirstUpdated();

    // Verify that no button was appended to the host
    expect(host.appendChild).not.toHaveBeenCalled();
  });

  it('should handle click events and prevent propagation when disabled', () => {
    // Set the host to disabled
    host.disabled = true;

    // Create a mock event
    const event = new MouseEvent('click');
    vi.spyOn(event, 'stopImmediatePropagation');
    vi.spyOn(event, 'preventDefault');

    // Get the click handler from the addEventListener call
    const clickHandler = host.addEventListener.mock.calls[0][1] as EventListener;

    // Call the click handler with the mock event
    clickHandler(event);

    // Verify that stopImmediatePropagation and preventDefault were called
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();

    // Verify that raiseEvent was not called
    expect(host.raiseEvent).not.toHaveBeenCalled();
  });

  it('should raise action event when clicked', () => {
    // Set the action
    host.action = 'test-action';

    // Create a mock event
    const event = new MouseEvent('click');

    // Get the click handler from the addEventListener call
    const clickHandler = host.addEventListener.mock.calls[0][1] as EventListener;

    // Call the click handler with the mock event
    clickHandler(event);

    // Verify that raiseEvent was called with the correct arguments
    expect(host.raiseEvent).toHaveBeenCalledWith('action', { action: 'test-action' });
  });

  it('should raise follow event when path is provided', () => {
    // Set the action and path
    host.action = 'test-action';
    host.path = '/test-path';

    // Create a mock event
    const event = new MouseEvent('click');

    // Get the click handler from the addEventListener call
    const clickHandler = host.addEventListener.mock.calls[0][1] as EventListener;

    // Call the click handler with the mock event
    clickHandler(event);

    // Verify that raiseEvent was called with the correct arguments
    expect(host.raiseEvent).toHaveBeenCalledWith('follow', { 
      action: 'test-action',
      path: '/test-path'
    });
  });

  it('should trigger submit button click when type is "submit"', () => {
    // Set the type to submit
    host.type = 'submit';

    // Call hostFirstUpdated to trigger submit button creation
    controller.hostFirstUpdated();

    // Get the submit button
    const button = host.appendChild.mock.calls[0][0] as HTMLButtonElement;

    // Spy on the button's click method
    vi.spyOn(button, 'click');

    // Create a mock event
    const event = new MouseEvent('click');

    // Get the click handler from the addEventListener call
    const clickHandler = host.addEventListener.mock.calls[0][1] as EventListener;

    // Call the click handler with the mock event
    clickHandler(event);

    // Verify that the submit button's click method was called
    expect(button.click).toHaveBeenCalled();
  });
});
