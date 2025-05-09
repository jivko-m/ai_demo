import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { renderIf } from '../../src/directives/render-if';

@customElement('test-component')
export class TestComponent extends LitElement {
  @property({ type: Boolean })
  showContent = false;

  render() {
    return html`
      <div>
        <h2>Test Component</h2>
        ${renderIf(this.showContent, html`<p id="conditional-content">Conditional Content</p>`)}
        <button @click=${this.toggleContent} id="toggle-button">Toggle Content</button>
      </div>
    `;
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-component': TestComponent;
  }
}