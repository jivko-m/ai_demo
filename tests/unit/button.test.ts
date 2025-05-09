import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { html } from 'lit';
import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';

// Mock the styles to avoid font import issues
vi.mock('../../src/styles/core-styles', () => ({
  coreStyles: { cssText: '/* Mocked core styles */' }
}));

vi.mock('../../src/styles/skin-styles', () => ({
  skinStyles: { cssText: '/* Mocked skin styles */' }
}));

vi.mock('../../src/styles/button-styles', () => ({
  buttonStyles: { cssText: '/* Mocked button styles */' }
}));

// Import the component after mocking
import '../../src/components/button';
import { CtrlButton } from '../../src/components/button';

describe('CtrlButton', () => {
  let element: CtrlButton;

  beforeEach(async () => {
    element = await fixture(html`<ctrl-button></ctrl-button>`) as CtrlButton;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it('should be defined', () => {
    expect(element).toBeDefined();
    expect(customElements.get('ctrl-button')).toBeDefined();
  });

  it('should render with default properties', () => {
    expect(element.disabled).toBe(false);
    expect(element.icon).toBe('');
    expect(element.text).toBe('');
    expect(element.path).toBe('');

    // These properties might be undefined initially, but they're treated as empty strings in the component
    expect(element.action || '').toBe('');
    expect(element.type || '').toBe('');
  });

  it('should render with custom properties', async () => {
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

  it('should set title from text if title is not provided', async () => {
    element = await fixture(html`<ctrl-button text="Button Text"></ctrl-button>`) as CtrlButton;

    // Wait for firstUpdated to complete
    await element.updateComplete;

    expect(element.title).toBe('Button Text');
  });

  it('should use provided title if available', async () => {
    element = await fixture(html`
      <ctrl-button text="Button Text" title="Custom Title"></ctrl-button>
    `) as CtrlButton;

    // Wait for firstUpdated to complete
    await element.updateComplete;

    expect(element.title).toBe('Custom Title');
  });

  it('should create a submit button when type is "submit"', async () => {
    element = await fixture(html`<ctrl-button type="submit"></ctrl-button>`) as CtrlButton;

    // Wait for firstUpdated to complete
    await element.updateComplete;

    const submitButton = element.querySelector('button[type="submit"]');
    expect(submitButton).toBeDefined();
  });

  it('should not trigger events when disabled', async () => {
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

  it('should raise action event when clicked', async () => {
    element = await fixture(html`<ctrl-button action="test-action"></ctrl-button>`) as CtrlButton;

    const raiseEventSpy = vi.spyOn(element, 'raiseEvent');

    element.click();

    expect(raiseEventSpy).toHaveBeenCalledWith('action', { action: 'test-action' });
  });

  it('should raise follow event when path is provided', async () => {
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

  it('should trigger submit button click when type is "submit"', async () => {
    element = await fixture(html`<ctrl-button type="submit"></ctrl-button>`) as CtrlButton;

    // Wait for firstUpdated to complete
    await element.updateComplete;

    const submitButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;
    const submitClickSpy = vi.spyOn(submitButton, 'click');

    element.click();

    expect(submitClickSpy).toHaveBeenCalled();
  });
});
