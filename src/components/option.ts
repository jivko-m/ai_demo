import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Option element for ctrl-select
 * This is a simple component that serves as a container for option data
 * The actual rendering is handled by the select component
 */
@customElement('ctrl-option')
export class CtrlOption extends LitElement {
  @property({ type: String, reflect: true })
  value = '';

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctrl-option': CtrlOption;
  }
}