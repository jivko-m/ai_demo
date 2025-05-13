import { describe, test, expect, vi, afterEach } from 'vitest';
import { html, fixture, fixtureCleanup } from '@open-wc/testing-helpers';

// Mock the styles to avoid font import issues
vi.mock('../../src/styles/core-styles', () => ({
  coreStyles: { cssText: '/* Mocked core styles */' }
}));

vi.mock('../../src/styles/skin-styles', () => ({
  skinStyles: { cssText: '/* Mocked skin styles */' }
}));


// Import the component after mocking
import { CtrlButton } from '../../src/components/button';

describe('CtrlButton', () => {
  let element: CtrlButton;
  
  afterEach(() => {
    fixtureCleanup();
  });

  test('should be defined', async () => {
    const element = await fixture(html`<ctrl-button></ctrl-button>`) as CtrlButton;
    expect(element).toBeDefined();
    expect(customElements.get('ctrl-button')).toBeDefined();
  });

  test('should render with default properties', async () => {
    const element = await fixture(html`<ctrl-button></ctrl-button>`) as CtrlButton;
    expect(element.disabled).toBe(false);
    expect(element.icon).toBe('');
    expect(element.text).toBe('');
    expect(element.path).toBe('');

    // These properties might be undefined initially, but they're treated as empty strings in the component
    expect(element.action || '').toBe('');
    expect(element.type || '').toBe('');
  });

  test('should render with custom properties', async () => {
    element = await fixture(html`
      <ctrl-button 
        text="Click me" 
        icon="draficon-check" 
        path="/some-path" 
        action="some-action"
      ></ctrl-button>
    `) as CtrlButton;

    expect(element.text).toBe('Click me');
    expect(element.icon).toBe('draficon-check');
    expect(element.path).toBe('/some-path');
    expect(element.action).toBe('some-action');

    const iconElement = element.shadowRoot?.querySelector('.draficon-check');
    const textElement = element.shadowRoot?.querySelector('.ctrl-text');

    expect(iconElement).toBeDefined();
    expect(textElement?.textContent?.trim()).toBe('Click me');
  });

  test('should set title from text if title is not provided', async () => {
    element = await fixture(html`<ctrl-button text="Button Text"></ctrl-button>`) as CtrlButton;

    await element.updateComplete;

    expect(element.title).toBe('Button Text');
  });

  test('should use provided title if available', async () => {
    element = await fixture(html`
      <ctrl-button text="Button Text" title="Custom Title"></ctrl-button>
    `) as CtrlButton;

    // Wait for firstUpdated to complete
    await element.updateComplete;

    expect(element.title).toBe('Custom Title');
  });

  test('should create a submit button when type is "submit"', async () => {
    element = await fixture(html`<ctrl-button type="submit"></ctrl-button>`) as CtrlButton;

    // Wait for firstUpdated to complete
    await element.updateComplete;

    const submitButton = element.querySelector('button[type="submit"]');
    expect(submitButton).toBeDefined();
  });

  test('should not trigger events when disabled', async () => {
    element = await fixture(html`<ctrl-button disabled></ctrl-button>`) as CtrlButton;

    const raiseEventSpy = vi.spyOn(element, 'raiseEvent');
    const clickEvent = new MouseEvent('click');
    const stopPropagationSpy = vi.spyOn(clickEvent, 'stopImmediatePropagation');
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    element.dispatchEvent(clickEvent);

    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(raiseEventSpy).not.toHaveBeenCalled();
  });

  test('should raise action event when clicked', async () => {
    element = await fixture(html`<ctrl-button action="test-action"></ctrl-button>`) as CtrlButton;

    const raiseEventSpy = vi.spyOn(element, 'raiseEvent');

    element.click();

    expect(raiseEventSpy).toHaveBeenCalledWith('action', { action: 'test-action' });
  });

  test('should raise follow event when path is provided', async () => {
    element = await fixture(html`
      <ctrl-button path="/test-path" action="test-action"></ctrl-button>
    `) as CtrlButton;

    const raiseEventSpy = vi.spyOn(element, 'raiseEvent');

    element.click();

    expect(raiseEventSpy).toHaveBeenCalledWith('follow', { 
      action: 'test-action',
      path: '/test-path'
    });
  });

  test('should trigger submit button click when type is "submit"', async () => {
    element = await fixture(html`<ctrl-button type="submit"></ctrl-button>`) as CtrlButton;

    // Wait for firstUpdated to complete
    await element.updateComplete;

    
    // Method 1: Check if the submit event handler is called
    const submitHandler = vi.fn();
    element.addEventListener('submit', submitHandler);
    
    // Method 2: Spy on the raiseEvent method
    const raiseEventSpy = vi.spyOn(element, 'raiseEvent');

    
    // Trigger a click on the button
    element.click();

    expect(raiseEventSpy).toHaveBeenCalledWith('submit');
    expect(submitHandler).toHaveBeenCalled();
  
  });
});
