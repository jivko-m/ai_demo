import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { renderIf, WebComponent } from '../web-component';
import { selectStyles } from '../styles/select-styles';
import { SelectController } from '../controllers/select-controller';

@customElement('ctrl-select')
export class CtrlSelect extends WebComponent {
  static get styles() {
    return [super.styles, selectStyles];
  }

  // Properties
  @property({ type: String }) name = '';
  @property({ type: String }) text = '';
  @property({ type: Array, attribute: 'data-source' }) dataSource: any[] = [];
  @property({ type: String, attribute: 'display-member' }) displayMember?: string;
  @property({ type: String, attribute: 'value-member' }) valueMember?: string;
  @property({ type: String }) value: any = null;
  @state() asyncContent = false;

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) nullable = false;

  @property({ type: Number, attribute: 'selected-index' }) selectedIndex = 0;
  @property({ attribute: false }) selectedItem?: any;

  // Select controller to handle select functionality
  private selectController: SelectController;
  private $select?: HTMLSelectElement;

  constructor() {
    super();
    
    // Initialize the select controller
    this.selectController = new SelectController(this);
  }

  // Delegate validation methods to the controller
  get willValidate(): boolean {
    return this.selectController.willValidate;
  }

  setCustomValidity(msg: string): void {
    this.selectController.setCustomValidity(msg);
  }

  checkValidity(): boolean {
    return this.selectController.checkValidity();
  }

  get validity(): ValidityState {
    return this.selectController.validity;
  }

  get validationMessage(): string {
    return this.selectController.validationMessage;
  }

  // Lifecycle methods
  firstUpdated(): void {
    super.firstUpdated();
    this.$select = this.shadowRoot?.querySelector('select') as HTMLSelectElement;
    this.selectController.hostFirstUpdated(this.shadowRoot!);
  }

  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    this.selectController.hostUpdated(changedProperties);
  }

  // Handle change events
  private handleChange(e: Event): void {
    this.selectController.handleChange(e);
  }

  // Clear selection
  clearSelection(): void {
    this.selectController.clearSelection();
  }

  // Render method
  render() {
    const label = this.displayMember && this.selectedItem
      ? this.selectedItem[this.displayMember]
      : this.selectedItem;

    return html`
      <span class="ctrl-inner ctrl-btn">
        <span class="ctrl-text">${label}
        <span class="draficon-arr-down"></span>
      </span>
      ${when(!this.readonly, 
        () => html`
          <select
            .value=${this.value}
            .selectedIndex=${this.selectedIndex}
            @change=${this.handleChange}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}>
          </select>
        `,
        () => html``
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ctrl-select': CtrlSelect;
  }
}