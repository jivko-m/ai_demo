import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { css } from 'lit';

// Mock the styles to avoid font import issues
vi.mock('../../src/styles/core-styles', () => ({
  coreStyles: css`/* Mocked core styles */`
}));

vi.mock('../../src/styles/skin-styles', () => ({
  skinStyles: css`/* Mocked skin styles */`
}));

import { WebComponent } from '../src/web-component';

// Register the custom element
customElements.define('test-component', WebComponent);

describe('WebComponent', () => {
  let component: WebComponent;
  let container: HTMLDivElement;

  beforeEach(() => {
    // Create a container for the component
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create the component
    component = document.createElement('test-component') as WebComponent;
    container.appendChild(component);
  });

  afterEach(() => {
    // Clean up
    document.body.removeChild(container);
  });

  describe('focus and blur', () => {
    test('should add focus class when focused', async () => {
      // Ensure disabled is false
      component.disabled = false;

      // Mock the shadowRoot and firstElementChild
      const mockElement = document.createElement('div');
      mockElement.focus = vi.fn();

      // Create a spy on classList.add to verify it's called
      const addClassSpy = vi.spyOn(component.classList, 'add');

      // Mock the shadowRoot with firstElementChild
      Object.defineProperty(component, 'shadowRoot', {
        get: () => ({ 
          firstElementChild: mockElement,
          querySelector: () => null // Add this to avoid errors with other methods
        }),
        configurable: true
      });

      // Call focus method
      component.focus();

      // Check if the class was added and focus was called
      expect(addClassSpy).toHaveBeenCalledWith('focus');
      expect(mockElement.focus).toHaveBeenCalled();
    });

    test('should not focus when disabled', async () => {
      // Mock the shadowRoot and firstElementChild
      const mockElement = document.createElement('div');
      mockElement.focus = vi.fn();
      Object.defineProperty(component, 'shadowRoot', {
        get: () => ({ firstElementChild: mockElement }),
        configurable: true
      });

      // Set disabled to true
      component.disabled = true;

      // Call focus method
      component.focus();

      // Check that focus class was not added and focus was not called
      expect(component.classList.contains('focus')).toBe(false);
      expect(mockElement.focus).not.toHaveBeenCalled();
    });

    test('should remove focus class when blurred', async () => {
      // Mock the shadowRoot and firstElementChild
      const mockElement = document.createElement('div');
      mockElement.blur = vi.fn();
      Object.defineProperty(component, 'shadowRoot', {
        get: () => ({ firstElementChild: mockElement }),
        configurable: true
      });

      // Add focus class first
      component.classList.add('focus');

      // Call blur method
      component.blur();

      // Check if the class was removed and blur was called
      expect(component.classList.contains('focus')).toBe(false);
      expect(mockElement.blur).toHaveBeenCalled();
    });
  });

  describe('getAssignedElements', () => {
    test('should return null when no slot is found', () => {
      // Mock empty shadowRoot
      Object.defineProperty(component, 'shadowRoot', {
        get: () => ({ querySelector: () => null }),
        configurable: true
      });

      const result = component.getAssignedElements();
      expect(result).toBeNull();
    });

    test('should return assigned elements for default slot', () => {
      // Mock slot with assigned elements
      const mockSlot = document.createElement('slot');
      const mockElements = [document.createElement('div'), document.createElement('span')];
      mockSlot.assignedElements = vi.fn().mockReturnValue(mockElements);

      Object.defineProperty(component, 'shadowRoot', {
        get: () => ({ querySelector: () => mockSlot }),
        configurable: true
      });

      const result = component.getAssignedElements();
      expect(result).toEqual(mockElements);
    });

    test('should return assigned elements for named slot', () => {
      // Mock named slot with assigned elements
      const mockSlot = document.createElement('slot');
      const mockElements = [document.createElement('div')];
      mockSlot.assignedElements = vi.fn().mockReturnValue(mockElements);

      Object.defineProperty(component, 'shadowRoot', {
        get: () => ({ 
          querySelector: (selector: string) => {
            return selector === 'slot[name="test"]' ? mockSlot : null;
          }
        }),
        configurable: true
      });

      const result = component.getAssignedElements('test');
      expect(result).toEqual(mockElements);
    });
  });

  describe('raiseEvent', () => {
    test('should dispatch a custom event with the specified type', () => {
      // Create a spy on dispatchEvent
      const dispatchEventSpy = vi.spyOn(component, 'dispatchEvent');

      // Call raiseEvent
      component.raiseEvent('test-event');

      // Check if dispatchEvent was called with a CustomEvent of the correct type
      expect(dispatchEventSpy).toHaveBeenCalled();
      const event = dispatchEventSpy.mock.calls[0][0] as CustomEvent;
      expect(event.type).toBe('test-event');
      expect(event.bubbles).toBe(true);
      expect(event.cancelable).toBe(true);
      expect(event.composed).toBe(true);
    });

    test('should include the provided data in the event detail', () => {
      // Create a spy on dispatchEvent
      const dispatchEventSpy = vi.spyOn(component, 'dispatchEvent');

      // Call raiseEvent with data
      const eventData = { foo: 'bar', count: 42 };
      component.raiseEvent('test-event', eventData);

      // Check if the event detail contains the provided data
      const event = dispatchEventSpy.mock.calls[0][0] as CustomEvent;
      expect(event.detail).toEqual(eventData);
    });

    test('should return the result of dispatchEvent', () => {
      // Mock dispatchEvent to return false (as if preventDefault was called)
      const dispatchEventSpy = vi.spyOn(component, 'dispatchEvent').mockReturnValue(false);

      // Call raiseEvent and check the return value
      const result = component.raiseEvent('test-event');
      expect(result).toBe(false);

      // Reset the mock
      dispatchEventSpy.mockRestore();
    });
  });

  describe('findParent', () => {
    test('should return the first parent element that matches the selector', () => {
      // Create a parent element with a specific class
      const parent = document.createElement('div');
      parent.classList.add('parent-class');

      // Create a grandparent element with a different class
      const grandparent = document.createElement('div');
      grandparent.classList.add('grandparent-class');

      // Set up the DOM hierarchy
      parent.appendChild(component);
      grandparent.appendChild(parent);
      container.innerHTML = '';
      container.appendChild(grandparent);

      // Call findParent with the parent's class
      const result = component.findParent('.parent-class');

      // Check if the correct element was returned
      expect(result).toBe(parent);
    });

    test('should return the component itself if no matching parent is found', () => {
      // Call findParent with a selector that doesn't match any parent
      const result = component.findParent('.non-existent-class');

      // Check if the component itself was returned
      expect(result).toBe(component);
    });

    test('should find a parent higher up in the hierarchy', () => {
      // Create a parent element
      const parent = document.createElement('div');

      // Create a grandparent element with a specific class
      const grandparent = document.createElement('div');
      grandparent.classList.add('grandparent-class');

      // Set up the DOM hierarchy
      parent.appendChild(component);
      grandparent.appendChild(parent);
      container.innerHTML = '';
      container.appendChild(grandparent);

      // Call findParent with the grandparent's class
      const result = component.findParent('.grandparent-class');

      // Check if the correct element was returned
      expect(result).toBe(grandparent);
    });
  });
});
