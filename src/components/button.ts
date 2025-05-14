import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { WebComponent} from '../web-component';

@customElement('ctrl-button')
export class CtrlButton extends WebComponent {
  static styles = [css`
    :host {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-clip: padding-box;
      background: var(--bgr-1, #3498db);
      color: var(--btn-color, white);
      border: none;
      border-radius: var(--border-radius, 0.3em);
      white-space: nowrap;
      padding: 0.4em 1em;
      transition: all 0.3s ease;
      min-height: 2.2em;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      font-weight: 500;
      letter-spacing: 0.02em;
      position: relative;
      overflow: hidden;
    }

    :host::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    :host(:hover) {
      background: var(--bgr-1-hover, #2980b9);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }

    :host(:hover)::after {
      opacity: 1;
    }

    :host(:active) {
      transform: translateY(1px);
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    }

    :host(:focus), :host(.focus) {
      outline: none;
      box-shadow: var(--focus-border, 0 0 0 3px rgba(52, 152, 219, 0.3)), 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .ctrl-text {
      margin: 0 0.3em;
      font-size: 0.95em;
    }

    .ficon, [class^="draficon-"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.6em;
      font-size: 1.1em;
    }

    :host([disabled]) {
      background: var(--bgr-disabled-btn, #e0e0e0);
      color: var(--btn-color-disabled, #a0a0a0);
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }

    :host([disabled]):hover {
      transform: none;
      box-shadow: none;
    }

    :host([disabled])::after {
      display: none;
    }

    /* Compact button variant */
    :host(.compact) {
      padding: 0.3em 0.7em;
      min-height: 1.8em;
      font-size: 0.9em;
    }

    :host(.compact) .ctrl-text {
      margin: 0 0.2em;
    }

    :host(.compact) .ficon, 
    :host(.compact) [class^="draficon-"] {
      margin-right: 0.3em;
      font-size: 1em;
    }
  `];

  @property({type: String}) name = '';
  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: String}) icon = '';
  @property({type: String}) type = '';
  @property({type: String}) action = '';
  @property({type: String}) path = '';
  @property({type: String}) text = '';
  @property({type: String}) title = '';

  constructor() {
    super();
    this.text = this.icon = this.path = '';// '';
    this.disabled = false;

    this.addEventListener('click', this.handleClick.bind(this), {capture: true});
  }

  handleClick(e: MouseEvent){
    if (this.disabled) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }

    if (this.type === 'submit') {
      e.stopImmediatePropagation();
      e.preventDefault();

      this.raiseEvent('submit');
      return;
    }

    let type = 'action';
    const detail: { action: string; path?: string } = { action: this.action };

    if (this.path) {
      type = 'follow';
      detail.path = this.path;
    }

    this.raiseEvent(type, detail);
  }

  firstUpdated() {
    if (this.type === 'submit') {
      const btnSubmit = document.createElement('button');

      btnSubmit.type = 'submit';

      Object.assign(btnSubmit.style, {
        position: 'fixed',
        left: '-999px',
        top: '-999px'
      });

      this.append(btnSubmit);
    }

    this.title = this.title === '' ? this.text : this.title;
  }

  render() {
    return html`
      ${this.icon ? html`<span class=${this.icon}></span>` : ''}
      ${this.text ? html`<span class="ctrl-text">${this.text}</span>` : html`<span class="ctrl-text"><slot></slot></span>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctrl-button': CtrlButton;
  }
}
