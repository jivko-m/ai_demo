import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { WebComponent } from '../web-component';
import { buttonStyles } from '../styles/button-styles';

@customElement('ctrl-button')
export class CtrlButton extends WebComponent {
  
  static get styles(){
    return [super.styles, buttonStyles];
  }
  

  @property({ type: String }) name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) icon = '';
  @property({ type: String }) type = '';
  @property({ type: String }) action = '';
  @property({ type: String }) path = '';
  @property({ type: String }) text = '';
  @property({ type: String }) title: string | undefined = undefined;

  private btnSubmit?: HTMLButtonElement;

  constructor() {
    super();

    // Initialize properties
    this.action = '';
    this.type = '';

    this.addEventListener('click', this.handleClick, { capture: true });
  }

  private handleClick(e: MouseEvent): void {
    if (this.disabled) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }

    if (this.type === 'submit') {
      this.btnSubmit?.click();
    }

    let type = 'action';
    const detail: Record<string, unknown> = { action: this.action };

    if (this.path) {
      type = 'follow';
      detail.path = this.path;
    }

    this.raiseEvent(type, detail);
  }

  firstUpdated(): void {
    if (this.type === 'submit') {
      const btnSubmit = document.createElement('button');
      btnSubmit.type = 'submit';

      Object.assign(btnSubmit.style, {
        position: 'fixed',
        left: '-999px',
        top: '-999px'
      });

      this.append(btnSubmit);
      this.btnSubmit = btnSubmit;
    }

    super.title = this.title !== undefined ? this.title : this.text;
  }

  render() {
    return html`
      ${this.icon ? html`<span class=${this.icon}></span>` : nothing}
      ${this.text 
        ? html`<span class="ctrl-text">${this.text}</span>` 
        : html`<span class="ctrl-text"><slot></slot></span>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctrl-button': CtrlButton;
  }
}
