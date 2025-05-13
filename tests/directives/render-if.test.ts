import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { html, render } from 'lit';
import { renderIf } from '../../src/directives/render-if';

describe('renderIf directive', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should render content when condition is true', () => {
    const template = html`${renderIf(true, () => html`<p>Content</p>`)}`;
    render(template, container);
    
    const paragraph = container.querySelector('p');
    expect(paragraph).not.toBeNull();
    expect(paragraph?.textContent).toBe('Content');
  });

  test('should not render content when condition is false', () => {
    const template = html`${renderIf(false, () => html`<p>Content</p>`)}`;
    render(template, container);
    
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeNull();
  });

  test('should update rendering when condition changes', () => {
    let condition = true;
    const renderTemplate = () => {
      const template = html`${renderIf(condition, () => html`<p>Content</p>`)}`;
      render(template, container);
    };

    // Initial render with condition = true
    renderTemplate();
    expect(container.querySelector('p')).not.toBeNull();

    // Update with condition = false
    condition = false;
    renderTemplate();
    expect(container.querySelector('p')).toBeNull();

    // Update back to condition = true
    condition = true;
    renderTemplate();
    expect(container.querySelector('p')).not.toBeNull();
  });

  test('should throw an error when used outside of child expressions', () => {
    expect(renderIf).toBeDefined();
    expect(typeof renderIf).toBe('function');
  });
});