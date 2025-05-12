import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import {renderIf, WebComponent} from '../web-component';
import { buttonStyles } from '../styles/button-styles';
import { ButtonController } from '../controllers/button-controller';

@customElement('ctrl-button')
export class CtrlButton extends WebComponent {

  static get styles() {
    const parentStyles = Array.isArray(super.styles) ? super.styles : [super.styles];
    return [...parentStyles, buttonStyles];
  }

  @property({type: String}) name = '';
  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: String}) icon = '';
  @property({type: String}) type = '';
  @property({type: String}) action = '';
  @property({type: String}) path = '';
  @property({type: String}) text = '';
  @property({type: String}) title: string = '';

  // Button controller to handle button functionality
  // @ts-ignore: Used for event handling and functionality, even if not directly referenced
  private buttonController: ButtonController;

  constructor() {
    super();

    // Initialize properties
    this.action = '';
    this.type = '';

    // Initialize the button controller
    this.buttonController = new ButtonController(this);
  }

  firstUpdated(): void {
    super.title = this.title || this.text;
  }

  render() {
    return html`
      ${renderIf(!!this.icon, () => html`<span class=${this.icon}></span>`)}
      <span class="ctrl-text">
        ${when(this.text,
            () => html`${this.text}`,
            () => html`
              <slot></slot>`)}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctrl-button': CtrlButton;
  }
}
