import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { css } from 'lit';

// Mock the styles to avoid font import issues
vi.mock('../../src/styles/core-styles', () => ({
  coreStyles: css`/* Mocked core styles */`
}));

vi.mock('../../src/styles/skin-styles', () => ({
  skinStyles: css`/* Mocked skin styles */`
}));

import { WebComponent } from '../../src/web-component';

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
    it('should add focus class when focused', async () => {
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

    it('should not focus when disabled', async () => {
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

    it('should remove focus class when blurred', async () => {
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
    it('should return null when no slot is found', () => {
      // Mock empty shadowRoot
      Object.defineProperty(component, 'shadowRoot', {
        get: () => ({ querySelector: () => null }),
        configurable: true
      });

      const result = component.getAssignedElements();
      expect(result).toBeNull();
    });

    it('should return assigned elements for default slot', () => {
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

    it('should return assigned elements for named slot', () => {
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

  describe('unimplemented methods', () => {
    it('should throw error for raiseEvent', () => {
      expect(() => component.raiseEvent('test-event')).toThrow('Not Implemented');
    });

    it('should throw error for findParent', () => {
      expect(() => component.findParent('.test-selector')).toThrow('Not implemented');
    });
  });
});
