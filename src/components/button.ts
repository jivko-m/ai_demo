import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { WebComponent} from '../web-component';

@customElement('ctrl-button')
export class CtrlButton extends WebComponent {
  static styles = css`
    :host {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-clip: padding-box;
      background: var(--bgr-1);
      border: none;
      border-radius: var(--border-radius, 0.2em);
      white-space: nowrap;
      padding: 0.5em 0.8em;
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
      min-height: 2.2em;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    :host(:hover) {
      background: var(--bgr-1-hover);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    :host(:focus), :host(.focus) {
      outline: none;
      box-shadow: var(--focus-border), 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .ctrl-text {
      margin: 0 0.2em;
    }

    .ficon, [class^="draficon-"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.4em;
    }

    :host([disabled]) {
      background: var(--bgr-disabled-btn);
      color: var(--btn-color-disabled);
      cursor: not-allowed;
      box-shadow: none;
    }
  `;

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

    this.addEventListener('click', this.handleClick.bind(this), {useCapture: true});
  }
  
  handleClick(e){
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
    const detail = { action: this.action };

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